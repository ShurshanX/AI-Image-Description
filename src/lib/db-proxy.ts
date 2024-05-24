import 'server-only'
import { sql as vercelSql ,db as verceldb} from '@vercel/postgres';
import { sql as pgSql, db as pgdb,neonsql} from '@/lib/postgres-client';
import { PrismaClient } from '@prisma/client';
 
export const prisma = new PrismaClient();

export const sql = process.env.POSTGRES_CLIENT_TYPE === 'vercel'  ? vercelSql : pgSql

export const db = process.env.POSTGRES_CLIENT_TYPE === 'vercel' ? verceldb : pgdb

export const edgesql = neonsql;

type clientType = "vercel" | "pg" | undefined;
