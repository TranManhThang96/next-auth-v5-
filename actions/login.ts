'use server';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import * as z from 'zod';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT_URL });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials' };
      }
      return { error: 'Something went wrong!' };
    }
    throw error;
  }
};
