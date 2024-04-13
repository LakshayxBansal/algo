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




/**
 * validate the add person to person table
 */
const options = ["contact", "employee"];
export const personSchema = z.object({
  personId:z.number().optional(),
  firstName: z.string().min(1).max(45),
  lastName: z.string().min(1).max(45),
  email: z.string().email(),
  phone: z.string().min(8).max(12),
  add1: z.string().min(1).max(45),
  add2: z.string().min(1).max(45),
  city: z.string().min(1).max(45),
  state: z.string().min(1).max(45),
  pin:z.string().min(1).max(45),
  personType:z.enum(options as [string, ...string[]]),
});

export const employeeSchema = z.object({
  person: personSchema,
  dept: z.string().min(1).max(45),
  role: z.string().min(1).max(45),
  manager: z.string().max(45),
  isAppUser: z.boolean() 
})

/**
 * validate inquiry schema
 */
export const inquirySchema = z.object({
  inquiryId:z.number().optional(),
  desc:z.string().min(1).max(45),
  customerId: z.number(),
  contactPersonId: z.number(),
  active:z.number().min(0).max(1),
  expectedRev:z.number(),
  probability: z.number().max(100),
  nextStageCompletionDate:z.date(),
  createDate: z.date(),
  creatorId: z.number()
  });


  /**
   * used for passing values to autocomplete
   */
  export const optionsData = z.object({ 
    id: z.number(),
    name: z.string()
  });



/*
cField1
cField2
cField3
cField4
cField5
cField6
cField7
cField8
cField9
cField10
cField11
cField12
cField13
cField14
cField15
date_time
*/