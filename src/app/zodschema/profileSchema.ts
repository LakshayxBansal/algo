import { z } from 'zod';


// export const createProfileSchema = z.object({
//   profile_id: z.number().min(1, "Profile ID is required").optional(),
//   name: z.string().min(1, 'Name cannot be empty'),
//   age: z.number().min(1, 'Age cannot be less than 1 '),
//   email: z.string()
//   .min(1, 'Email is required')
//   .email('Invalid email address')
//   .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
//   .max(100, 'Email is too long'),
//   phone: z.string().min(11, 'Phone number should be at least 10 characters').max(22, 'Phone number is too long').trim(),
//   country_id: z.number().min(1, 'Invalid country ID'), 
//   country_name: z.string().optional(),
//   state_id: z.number().min(1, 'Invalid state ID'), 
//   state_name: z.string().optional(), 
//   user_id: z.number().min(1, 'Invalid user ID').optional(),
// });



export const createProfileSchema = z.object({
  profile_id: z.number().min(1, "Profile ID is required").optional(),
  name: z.string().min(1, 'Name cannot be empty'),
  age: z.number().min(1, 'Age cannot be less than 1 ').max(100, 'Age cannot be greater than 100'),
  email: z.string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
  .max(100, 'Email is too long'),
  phone: z.string().refine((phone) => {
    const cleanedPhone = phone.replace(/\s+/g, " ").trim();
    const phoneParts = cleanedPhone.split(" ");
  
    if (phoneParts.length < 2) return false;
  
    const countryCode = phoneParts[0];
    const extractedPhone = phoneParts.slice(1).join("");
    if (!/^\+\d+$/.test(countryCode)) return false;
    return /^\d{10}$/.test(extractedPhone);
  }, {
    message: "Must have exactly 10 digits",
  }),
  
  country_id: z.number().min(1, 'Country cannot be empty'), 
  country_name: z.string().optional(),
  state_id: z.number().min(1, 'State cannot be empty'), 
  state_name: z.string().optional(), 
  user_id: z.number().min(1, 'Invalid user ID').optional(),
});