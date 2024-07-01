"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function Dashboardlayout({children}) {

    const router=useRouter();
    const {user}=useUser();
    useEffect(()=>{
        user&&checkUserBudgets();
    },[user])
    const checkUserBudgets=async()=>{
        const result=await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        console.log(result);
        if(result?.length==0)
            {
                router.replace('/dashboard/budgets')
            }
    }
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
        {children}
        </div>
        </div>
  )
}

export default Dashboardlayout