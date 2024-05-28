'use client';

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react'
import { LogOut } from "lucide-react";

export default function CurrentUser() {
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <div className='p-layout flex items-center justify-between'>
      <div className="flex items-center">
        <Image
          src={user?.avatar?.url || '/no-avatar.png'}
          alt={user?.email || 'User avatar'}
          width={50}
          height={50}
          className="mr-4"
        />
        <div className="text-sm">
          <div>{user?.username}</div>
          <div className="opacity-30">{'Frontend Developer'}</div>
        </div>
      </div>
      <button
        onClick={() =>
          signOut({
            redirect: false,
          }).then(() => {
            window.localStorage.removeItem('token')
            push('/login')
          })
        }
        className='text-[#7C7275] hover:text-white transition-colors ease-linear'
      >
        <LogOut/>
      </button>
    </div>
  )
}
