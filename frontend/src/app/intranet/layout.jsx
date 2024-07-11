'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarIntranet from '../../components/layout/NavbarIntranet';

const IntranetLayout = ({ children }) => {
  const router = useRouter();

  if (typeof window === 'undefined' || !localStorage.getItem('users')) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex min-h-screen w-full flex-col text-white'
      style={{ backgroundImage: "url('/fondo.gif')" }}>
      <NavbarIntranet/>
      {children}
    </div>
  );
};

export default IntranetLayout;
