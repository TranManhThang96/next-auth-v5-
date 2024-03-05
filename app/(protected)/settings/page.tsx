'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react';

const SettingPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };
  return (
    <div className="rounded-xl bg-white p-10">
      <button type="submit" onClick={onClick}>
        Sign out
      </button>
    </div>
  );
};

export default SettingPage;
