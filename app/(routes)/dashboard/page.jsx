"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import Cardinfo from './_components/Cardinfo';
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import Budgetitem from './budgets/_components/Budgetitem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Dashboard() {
  const [budgetList,setBudgetList]=useState([]);
  const [expensesList,setExpensesList]=useState([]);
  const {user}=useUser();
  useEffect(()=>{
    user&&getBudgetList();
  },[user])

  const getBudgetList=async()=>{
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  }
  const getAllExpenses=async()=>{
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt,
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }

  return (
    <div className='p-8'>
      <div className='flex justify-between'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
      <div className='flex gap-2 items-center'>
      <Link href='/dashboard/budgets' className='cursor-pointer'>
      <Button>Budget Tab</Button>
      </Link>
      </div>
      </div>
      <p className='text-gray-500'>Here's what happenning with your money, Lets Manage your expense</p>
      <Cardinfo budgetList={budgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList}/>
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList()}/>
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget,index)=>(
            <Budgetitem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard