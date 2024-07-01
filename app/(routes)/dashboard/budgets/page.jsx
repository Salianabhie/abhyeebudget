"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from "next/navigation";

function Budgets() {
  const route = useRouter();
  return (
    <div className='p-10'>
        <span className="flex gap-2 items-center">
          <ArrowLeft className='cursor-pointer' onClick={()=>route.back()}/>
          My Budgets
        </span>
        <BudgetList/>
    </div>
  )
}

export default Budgets