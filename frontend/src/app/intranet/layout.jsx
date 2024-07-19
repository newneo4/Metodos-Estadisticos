'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarIntranet from '../../components/layout/NavbarIntranet';

const IntranetLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Verifica si estamos en el entorno del cliente
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem('users');
        if (!user) {
          router.push('/login');
        } else {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex min-h-screen w-full flex-col text-white' style={{ backgroundImage: "url('/fondo.gif')" }}>
      <NavbarIntranet />
      {children}
    </div>
  );
};

export default IntranetLayout;
