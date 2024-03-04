'use client';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
import { signIn } from 'next-auth/react';

export const Social = () => {
  const signInSocial = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,
    });
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" variant="outline" className="w-full" onClick={() => signInSocial('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => signInSocial('github')}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
