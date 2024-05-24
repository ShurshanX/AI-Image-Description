import 'server-only'
import { Environment, Paddle } from '@paddle/paddle-node-sdk'


const paddle = new Paddle(String(process.env.PADDLE_API_KEY), {
    environment: process.env.PADDLE_API_ENV ? Environment.sandbox : Environment.production, // or Environment.sandbox for accessing sandbox API
  })
export async function getTransactionDetails(transactionId: string) {

    const transaction = await paddle.transactions.get(transactionId);
    return transaction;

}