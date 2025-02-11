import { z } from 'zod';


export const createProfileSchema = z.object({
  profile_id: z.number().min(1, "Profile ID is required").optional(),
  name: z.string().min(1, 'Name cannot be empty'),
  age: z.number().min(1, 'Age cannot be less than 1 '),
  email: z.string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
  .max(100, 'Email is too long'),
  phone: z.string().min(11, 'Phone number should be at least 10 characters').max(22, 'Phone number is too long'),
  country_id: z.number().min(1, 'Invalid country ID'), 
  country_name: z.string().optional(),
  state_id: z.number().min(1, 'Invalid state ID'), 
  state_name: z.string().optional(), 
  user_id: z.number().min(1, 'Invalid user ID').optional(),
});

