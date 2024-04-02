import * as z from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
  firstname: z.string().min(1).max(45),
  lastname: z.string().min(1).max(45),
});

export const companySchema = z.object({
  nameVal: z.string().min(1).max(45),
 add1: z.string().min(1).max(45),
 add2: z.string().min(0).max(45),
 city: z.string().min(1).max(45),
 pincode: z.string().min(0).max(45),
 dbId: z.number().min(0),
 stateId: z.string().min(0).max(45),
 cfield1: z.string().min(0).max(45),
 cfield2: z.string().min(0).max(45),
 cfield3: z.string().min(0).max(45),
 cfield4: z.string().min(0).max(45),
 cfield5: z.string().min(0).max(45),
 cfield6: z.string().min(0).max(45),
 cfield7: z.string().min(0).max(45)
});
