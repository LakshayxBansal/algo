import * as z from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
  firstname: z.string().min(1).max(45),
  lastname: z.string().min(1).max(45),
});


export const organisationSchema = z.object({
  name: z.string().min(1).max(45),
  alias: z.string().max(45),
  pan: z.string().max(20),
  gst: z.string().max(20),
  country_id: z.number(),
  state_id: z.number(),
  city: z.string().max(75),
  pin: z.string().max(20),
  add1: z.string().min(1).max(75),
  add2: z.string().min(0).max(75),
  add3: z.string().min(0).max(75),
});




/**
 * validate the add person to person table
 */
const options = ["contact", "employee"];
export const contactSchema = z.object({
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
  person: contactSchema,
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


  /**
 * used for passing values to add dialogs
 */
export const addEntityDlg = z.object({ 
  open: z.boolean(),
  data: z.string()
});



/**
 * zod schema for menu options
 */
export const menuOption = z.object({
  id: z.number(),
  name: z.string().min(1).max(30),
  short_name: z.string().min(1).max(30), 
  parent_id: z.number(), 
  icon: z.string().min(1).max(30), 
  href: z.string().min(1).max(30), 
  default_open: z.number(), 
  created_on: z.date(), 
  modified_on: z.date(), 
  created_by: z.number(), 
  modified_by: z.number(), 
  menu_order: z.number(),

})

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
this is a test string
*/