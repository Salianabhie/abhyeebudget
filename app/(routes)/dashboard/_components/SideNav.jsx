"use client"
import { UserButton } from '@clerk/nextjs'
import { Icon, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            Icon: LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            Icon: PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:'Expenses',
            Icon: ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:'Upgrade',
            Icon: ShieldCheck,
            path:'/dashboard/upgrade'
        },
    ]
    const path= usePathname();
    useEffect(()=>{
        console.log(path)
    },[path])
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Link href={'/'}>
        <Image src={'/logo.svg'} alt='logo' width={39} height={39}/>
        </Link>
        <div className='mt-5'>
            {menuList.map((menu,index)=> (
                <Link href={menu.path}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-6 cursor-pointer rounded-md hover:text-primary hover:bg-orange-100 ${path==menu.path&&'text-primary bg-orange-100'}`}>
                    <menu.Icon/>
                    {menu.name}</h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 flex p-6 gap-2 items-center  bg-orange-100 rounded-full'>
            <UserButton/>
            <span className='text-primary font-medium'>Profile</span>
        </div>
    </div>
  )
}

export default SideNav