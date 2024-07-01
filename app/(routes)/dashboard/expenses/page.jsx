"use client"
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig';
import { desc, eq,} from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';

function page() {

    const [expensesList,setExpensesList]=useState([]);
    const {user}=useUser();
    useEffect(()=>{
      user&&getAllExpenses();
    },[user])
  
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
    <div className='p-10'>
        <h2 className='font-bold text-lg'>My Expense</h2>
        <div className='mt-3'>
            <div>
            <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetList()}/>
            </div>
        </div>
    </div>
  )
}

export default page