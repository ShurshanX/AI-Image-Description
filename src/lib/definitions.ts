process.env.ZOD_LOCALE = "en";

import { z } from 'zod'

export type User = {
    error_code: number;
    description: string;
    error_msg: string;
  };
export const ContactFormSchema = z.object({
    first_name: z.string().min(2, { message: 'First Name must be at least 2 characters long.' }).trim(),
    last_name: z.string().min(2, { message: 'Last Name must be at least 2 characters long.' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    message: z.string().min(5, { message: 'message must be at least 5 characters long.' }).trim()
})
   
export type FormState =
{
  errors?: {
    first_name?: string[]
    last_name?: string[]
    email?: string[]
    message?: string[]
    }
  message?: string
  success?: boolean
}| undefined
