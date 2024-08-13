import * as z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$|^$/
);
const panRegEx = new RegExp(/^[a-zA-Z0-9]{5}[0-9]{4}[a-zA-Z0-9]$/);
const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
const aadhaarRegex = new RegExp(/^(d{12})$/);
const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
);

export const userSchema = z
  .object({
    email: z.union([z.string().optional(), z.string().email()]),
    password: z.union([
      z.string().optional(),
      z
        .string()
        .min(8)
        .max(50)
        .regex(
          passwordRegex,
          "Minimum 8 characters required with atleast 1 letter, 1 number, and 1 special character"
        ),
    ]),
    name: z.string().min(1).max(45),
    phone: z.string().max(15).optional(),
    repassword: z.string().max(50).optional(),
    provider: z.string().max(15).optional(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.repassword;
    },
    { message: "passwords should match", path: ["password", "repassword"] }
  )
  .refine(
    (schema) => {
      return !(schema.email === "" && schema.phone === "");
    },
    { message: "please provide email, or phone no", path: ["email", "phone"] }
  );

/*
refine(schema => {
  return (
      schema.email === '' && 
      schema.phone === ''); 
}, {message: "please provide email, or phone no", path: ["email", "phone"]})
*/
export const organisationSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(75),
  alias: z.string().max(75).optional(),
  printName: z.string().max(75).optional(),
  address1: z.string().max(75).optional(),
  address2: z.string().max(75).optional(),
  address3: z.string().max(75).optional(),
  city: z.string().max(75).optional(),
  state_id: z.number().optional(),
  state: z.string().optional(),
  country_id: z.number().optional(),
  country: z.string().optional(),
  pan: z.union([
    z.string().optional(),
    z.string().min(10).regex(panRegEx, "Invalid PAN number!"),
  ]),
  gstin: z.union([
    z.string().optional(),
    z.string().min(10).regex(panRegEx, "Invalid GSTIN number!"),
  ]),
  pincode: z.string().max(15).optional(),
  stamp: z.number().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
});

const contactDetailsSchema = z
  .object({
    email: z.union([z.literal(""), z.string().email().max(100)]),
    mobile: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    whatsapp: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
  })
  .partial()
  .refine(
    ({ email, mobile, whatsapp }) =>
      mobile !== "" || email !== "" || whatsapp !== "",
    {
      message: "One of the fields must be defined",
    }
  );

/**
 * validate the add person to person table
 */
export const contactSchema = z
  .object({
    id: z.number().optional(),
    alias: z.string().max(60).optional(),
    name: z.string().min(1).max(60),
    print_name: z.string().max(60).optional(),
    pan: z.union([
      z.literal(""),
      z.string().min(10).regex(panRegEx, "Invalid PAN number!"),
    ]),
    aadhaar: z.union([z.literal(""), z.string().max(20)]),
    address1: z.string().max(75),
    address2: z.string().max(75),
    address3: z.string().max(75),
    pincode: z.string().max(15),
    email: z.union([z.literal(""), z.string().email().max(100)]),
    mobile: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    whatsapp: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    dob: z.date().optional(),
    doa: z.date().optional(),
    contactGroup_id: z.number().optional(),
    contactGroup: z.string().optional(),
    state: z.string().optional(),
    area: z.string().optional(),
    area_id: z.number().optional(),
    department: z.string().optional(),
    organisation: z.string().optional(),
    department_id: z.number().optional(),
    organisation_id: z.number().optional(),
    state_id: z.number().optional(),
    country_id: z.number().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
  })
  .refine(
    (schema) => {
      return !(schema.email === "" && schema.mobile === "");
    },
    { message: "please provide email, or phone no", path: ["mobile", "email"] }
  );

export const executiveSchema = z
  .object({
    id: z.number().optional(),
    alias: z.string().max(60).optional(),
    name: z.string().min(1).max(60),
    address1: z.string().max(75).optional(),
    address2: z.string().max(75).optional(),
    address3: z.string().max(75).optional(),
    city: z.string().max(75).optional(),
    state_id: z.number().optional(),
    state: z.string().max(60).optional(),
    pincode: z.string().max(15).optional(),
    country_id: z.number().optional(),
    country: z.string().max(60).optional(),
    email: z.string().max(100).optional(),
    mobile: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    whatsapp: z.union([
      z.literal(""),
      z.string().regex(phoneRegex, "Invalid Number!"),
    ]),
    created_by: z.number().optional(),
    created_on: z.union([z.literal(""), z.date().optional()]),
    modified_by: z.number().optional(),
    modified_on: z.union([z.literal(""), z.date().optional()]),
    stamp: z.number().optional(),
    dob: z.union([z.literal(""), z.date().optional()]),
    doa: z.union([z.literal(""), z.date().optional()]),
    doj: z.union([z.literal(""), z.date().optional()]),
    area_id: z.number().optional(),
    area: z.string().max(60).optional(),
    call_type_id: z.number().optional(),
    call_type: z.string().min(1).max(45),
    crm_user: z.string().min(1).max(60),
    crm_map_id: z.number().optional(),
    role_id: z.number().optional(),
    role: z.string().min(1).max(45),
    executive_dept_id: z.number().optional(),
    executive_dept: z.string().max(75).optional(),
    executive_group_id: z.number().optional(),
    executive_group: z.string().max(75).optional(),
  })
  .refine(
    (schema) => {
      return false;
    },
    { message: "please provide email, or phone no", path: ["email", "mobile"] }
  );

/**
 * validate enquiry header schema
 */

export const enquiryHeaderSchema = z.object({
  id: z.number().optional(),
  enq_number: z.string().min(1).max(75),
  date: z.string().min(1).max(20),
  auto_number: z.number().optional(),
  contact_id: z.number().min(1),
  contact: z.string().min(1).max(60),
  received_by_id: z.number().min(1),
  received_by: z.string().min(1).max(60),
  category_id: z.number().min(1),
  category: z.string().min(1).max(60),
  source_id: z.number().min(1),
  source: z.string().min(1).max(60),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
});

/**
 * validate enquiry ledger schema
 */
export const enquiryLedgerSchema = z.object({
  enquiry_id: z.number().optional(),
  status_version: z.number().optional(),
  allocated_to_id: z.number().min(0),
  allocated_to: z.string().max(60).optional(),
  date: z.string().min(1).max(20),
  status_id: z.number().min(1),
  sub_status: z.string().min(1).max(50),
  sub_status_id: z.number().min(1),
  action_taken_id: z.number().min(1),
  action_taken: z.string().min(1).max(60),
  next_action_id: z.number().min(1),
  next_action: z.string().min(1).max(60),
  next_action_date: z.string().min(1).max(20),
  enquiry_remark: z.string().max(5000).optional(),
  suggested_action_remark: z.string().max(5000).optional(),
  action_taken_remark: z.string().max(5000).optional(),
  closure_remark: z.string().max(5000).optional(),
  enquiry_tran_type: z.number().optional(),
  id: z.number().optional(),
  active: z.number().optional(),
});

/**
 * contact group
 */
export const contactGroupSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parent: z.string().max(60).optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
});

/**
 * Executive Role
 */
export const executiveRoleSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parentRole: z.string().max(60).optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
  department_id: z.number().optional(),
});

/**
 * Executive Group
 */
export const executiveGroupSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  parent: z.string().max(60).optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
});

/**
 * Executive Dept
 */
export const executiveDeptSchema = z.object({
  id: z.number().optional(),
  alias: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  stamp: z.number().optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.number().optional(),
});

/**
 * used for passing values to autocomplete
 */
export const optionsData = z.object({
  id: z.number(),
  name: z.string(),
});

/**
 * used for passing values to add dialogs
 */
export const addEntityDlg = z.object({
  open: z.boolean(),
  data: z.string(),
});

export const modifyEntityDlg = z.object({
  open: z.boolean(),
  data: z.object({}),
});

export const deleteEntityDlg = z.object({
  open: z.boolean(),
  data: z.object({}),
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
});

/**
 * used for storing sub status master
 */
export const enquirySubStatusMaster = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(50),
  status_id: z.number().optional(),
  status: z.string().min(1).max(30),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  stamp: z.number().optional(),
});

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
  alias: z.string().max(45),
});
