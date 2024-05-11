'use server';
import { ContactFormSchema, FormState } from '@/lib/definitions'
export async function addContactInfo(state: FormState,formData:FormData) {

    const validatedFields = ContactFormSchema.safeParse({
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        message: formData.get('message'),
      })

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }

    const { first_name, last_name, email, message } = validatedFields.data

    const name = first_name + " " + last_name;

    return {
        message: 'Your message has been submitted,We value your feedback as it empowers us to enhance our tools.',
        success:true
    }
   
}