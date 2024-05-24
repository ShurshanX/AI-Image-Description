import 'server-only'
import { Pool } from 'pg';
import type {
  QueryResult,
  QueryResultRow,
} from '@neondatabase/serverless';

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function sql<O extends QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: Primitive[]
): Promise<QueryResult<O>> {
  const [query, params] = sqlTemplate(strings, ...values);

  try {
    const result = await pool.query(query, params);
    return result as unknown as Promise<QueryResult<O>>;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Failed to execute query');
  }

}

export async function neonsql<O extends QueryResultRow>(strings: TemplateStringsArray, ...values: Primitive[]): Promise<QueryResult<O>> {
  try {
    const url = process.env.POSTGRES_NEON_PUBLIC_API_BASE_URL as string;
    const [query, params] = sqlTemplate(strings, ...values);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        params: params
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to execute query: ${await response.text()}`);
    }
    const payload: QueryResult<O> = await response.json();
    return payload;
  } catch (error) {
    console.error('Failed to execute query:', error);
    throw new Error(`Failed to execute query: ${error?.toString()}`);
  }
}

export const db = pool;


export function sqlTemplate(
  strings: TemplateStringsArray,
  ...values: Primitive[]
): [string, Primitive[]] {
  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {
    throw new Error("Invalid template strings array. Use it as a tagged template: sql`SELECT * FROM users`.");
  }

  let query = strings[0] ?? '';

  for (let i = 1; i < strings.length; i++) {
    query += `$${i}${strings[i] ?? ''} `;
  }

  return [query.trim(), values];
}

function isTemplateStringsArray(strings: unknown): strings is TemplateStringsArray {
  return Array.isArray(strings) && 'raw' in strings && Array.isArray(strings.raw);
}

export type Primitive = string | number | boolean | undefined | null;


