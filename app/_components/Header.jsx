"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function Header() {

  const {user, isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src='/logo.svg' alt='logo' width={50} height={42}/>
        <div className='flex gap-5 justify-between'>

        <Link href={'/dashboard'}>
        <Button variant="outline">Dashboard</Button></Link>
        {isSignedIn?
          <UserButton/> :  
          <Link href={'/sign-in'}>
          <Button>Get Started</Button>
          </Link>
      }

        </div>
    </div>
  )
}

export default Header