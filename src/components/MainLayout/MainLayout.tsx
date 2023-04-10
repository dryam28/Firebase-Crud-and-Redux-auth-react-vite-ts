import React from 'react';
import UserButton from './UserButon/UserButton';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <UserButton />
      <main className='mt-10'>{children}</main>
    </div>
  );
};

export default MainLayout;
