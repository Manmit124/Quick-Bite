import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';


const LogoutButton = () => {
 

  return (
    <Button type="button" onClick={() => signOut()} className="group-hover:text-white">
    Logout
  </Button>
  );
};

export default LogoutButton;