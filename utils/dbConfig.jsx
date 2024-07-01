import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon('postgresql://abhyeebudget_owner:uVmf3CKMPF0W@ep-soft-bonus-a5u14jsm.us-east-2.aws.neon.tech/abhyeebudget?sslmode=require');
export const db = drizzle(sql,{schema});
