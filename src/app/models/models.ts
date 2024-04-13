import * as z from 'zod';
import * as zs from '../zodschema/zodschema';

export type userT = z.infer<typeof zs.userSchema>;

export type companyT = z.infer<typeof zs.companySchema>;

export type personT = z.infer<typeof zs.personSchema>;

export type employeeT = z.infer<typeof zs.employeeSchema>;

export type inquiryT = z.infer<typeof zs.inquirySchema>;

export type optionsDataT = z.infer<typeof zs.optionsData>;