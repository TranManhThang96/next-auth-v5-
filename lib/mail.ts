import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:8000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: 'ThangTm <onboarding@resend.dev>',
    to: [email],
    subject: 'Verification email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
