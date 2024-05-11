import * as z from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
const panRegEx = new RegExp(/^[a-zA-Z0-9]{5}[0-9]{4}[a-zA-Z0-9]$/);
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
  firstname: z.string().min(1).max(45),
  lastname: z.string().min(1).max(45),
});


export const organisationSchema = z.object({
  id:z.number().optional(),
  name: z.string().min(1).max(75),
  alias: z.string().max(75).optional(),
  printName: z.string().max(75).optional(),
  address1: z.string().max(75).optional(),
  address2: z.string().max(75).optional(),
  address3: z.string().max(75).optional(),
  city: z.string().max(75).optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pan: z.union([z.string().optional(), z.string().min(10).regex(panRegEx, 'Invalid PAN number!')]),
  gstin: z.union([z.string().optional(), z.string().min(10).regex(panRegEx, 'Invalid GSTIN number!')]),
  pincode: z.string().max(15).optional(),
  stamp: z.number().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
});


//  pan: z.string().regex(panRegEx, 'Invalid PAN number!'),

// z.string().regex(panRegEx, 'Invalid PAN number!'),
/**
 * validate the add person to person table
 */
export const contactSchema = z.object({
  id:z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  print_name: z.string().max(60).optional(),
  pan: z.union([z.string().optional(), z.string().min(10).regex(panRegEx, 'Invalid PAN number!')]),
  aadhaar: z.string().max(20), 
  address1: z.string().max(75), 
  address2: z.string().max(75), 
  address3: z.string().max(75), 
  pincode: z.string().max(15),
  email: z.string().email().max(100),
  mobile:  z.string().regex(phoneRegex, 'Invalid Number!'),
  whatsapp: z.string().regex(phoneRegex, 'Invalid Number!'),
  dob: z.date().optional(),
  doa: z.date().optional(),
  contactGroup: z.string().optional(), 
  state: z.string().optional(),
  area: z.string().optional(), 
  department: z.string().optional(), 
  organisation: z.string().optional(), 
  country: z.string().optional(),
  city: z.string().optional(), 
});


export const employeeSchema = z.object({
  person: contactSchema,
  dept: z.string().min(1).max(45),
  role: z.string().min(1).max(45),
  manager: z.string().max(45),
  isAppUser: z.boolean() 
})


/**
 * validate enquiry schema
 */

export const enquirySchema = z.object({
  id: z.number().optional(),
  desc: z.string().min(1).max(75),
  date: z.date(),
  enq_number : z.string().min(1),
  contact_id: z.number(),
  received_by_id : z.number(),
  category_id: z.number(),
  source_id : z.number(),
  executive_id : z.number(),
  allocated_to : z.number().optional(),
  modified_by : z.number().optional(), 
  modified_on : z.date().optional(),
  created_by : z.number().optional(), 
  created_on : z.number().optional(),
});


/**
 * 
 */
export const contactGroupSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  stamp: z.number().optional(),
  parentGroup: z.string().max(60).optional(),
  modified_by : z.number().optional(), 
  modified_on : z.date().optional(),
  created_by : z.number().optional(), 
  created_on : z.number().optional(),
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


/**
 * used for storing sub status master
 */
export const enquirySubStatusMaster = z.object({ 
  id: z.number().optional(),
  name: z.string().min(1).max(50),
  status: z.string().min(1).max(30), 
  created_on: z.date(), 
  modified_on: z.date(), 
  created_by: z.number(), 
  modified_by: z.number(), 
  stamp: z.number(),});


/**
 * used for storing simple name master
 */
export const nameMasterData = z.object({ 
  id: z.number().optional(),
  name: z.string().min(1).max(45),
});


/**
 * used for storing name, alias master
 */
export const nameAliasData = z.object({ 
  id: z.number().optional(),
  name: z.string().min(1).max(45),
  alias: z.string().max(45)
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
this is a test string. this is edited again.
*/