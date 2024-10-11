import * as z from "zod";
import { checkPhone,checkPhoneEmpty } from "../utils/phoneUtils";

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

export const signInSchema = z.object({
  email : z.string().optional(),
  phone : z.string().min(1,"Please enter phone number").refine((val) => checkPhoneEmpty(val), {
    message: "Please enter phone number",
    path: ["phone"],
  }).optional(),
  password : z.string().min(1,"Please enter password")
}).refine(
  (schema) => {
    return !(schema.email === "");
  },
  { message: "Please enter email", path: ["email"] }
)

export const userSchema = z
  .object({
    // email: z.union([z.string().optional(), z.string().email()]),
    email: z
      .string()
      .regex(emailRegex, "Input must be in email format")
      .optional(),
    password :   z
    .string()
    .min(8)
    .max(50)
    .regex(
      passwordRegex,
      "Minimum 8 characters required with atleast 1 letter, 1 number, and 1 special character"
    ),
    name: z.string().min(1,"Name must not be empty").max(45),
    phone: z.string().min(1,"Please provide phone").refine((val) => checkPhone(val), {
      message: "Please provide a valid Phone No",
      path: ["phone"],
    }).optional(),
    contact: z.string().optional(),
    repassword: z.string().max(50),
    provider: z.string().max(15).optional(),
  })
  .refine(
    (schema) => {
      return schema.password === schema.repassword;
    },
    { message: "Passwords should match", path: ["password", "repassword"] }
  )
  .refine(
    (schema) => {
      return !(schema.email === "");
    },
    { message: "Please provide email", path: ["email"] }
  )

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

export const deptSchema = z.object({
  name: z.string().min(1).max(45)
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

export const ItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(75),
  // stamp: z.number().optional(),
  group: z.number().optional(),
  group_name: z.string().optional(),
  alias: z.string().max(75).optional(),
  unit: z.number().optional(),
  unit_name: z.string().optional(),
  hsn_code: z.string().max(60).optional(),
  // created_by: z.number().optional(),
  // modified_by: z.number().optional(),
  // created_on: z.date().optional(),
  // modified_on: z.date().optional(),
});

export const UnitSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(50),
  uqc: z.string().max(50),
  stamp: z.number().optional(),
  group_id: z.number().optional(),
  created_by: z.number().optional(),
  modified_by: z.number().optional(),
  created_on: z.date().optional(),
  modified_on: z.date().optional(),
});

/**
 * validate the add person to person table
 */
export const contactSchema = z.object({
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
  mobile: z.string().refine((val) => checkPhone(val), {
    message: "Please provide a valid Phone No",
    path: ["mobile"],
  }),
  whatsapp: z.string().refine((val) => checkPhone(val), {
    message: "Please provide a valid Whatsapp No",
    path: ["whatsapp"],
  }),
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
});

export const areaSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(60 ,"Area name must contain atmost 60 character(s)").min(1,"Area name must contain atleast 1 character(s)"),
});

export const stateListSchema = z.object({
  id: z.number().optional(),
  country: z.string().max(60).optional(),
  state_id: z.number().optional(),
  state: z.string().max(60).optional(),
  name: z.string().min(1).max(60),
  alias: z.string().min(1).max(45),
  country_id: z.number(),
});

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
    crm_user: z.string().max(60).optional(),
    crm_user_id: z.number().optional(),
    crm_map_id: z.number().optional(),
    role_id: z.number().optional(),
    role: z.string().min(1, "Select role").max(45).optional(),
    executive_dept_id: z.number().optional(),
    executive_dept: z.string().max(75).optional(),
    executive_group_id: z.number().optional(),
    executive_group: z.string().max(75).optional(),
    pan: z.union([
      z.literal(""),
      z.string().min(10).regex(panRegEx, "Invalid PAN number!"),
    ]),
    aadhaar: z.union([z.literal(""), z.string().max(20)]),
  })
  .refine(
    (schema) => {
      return !(schema.email === "" && schema.mobile === "");
    },
    { message: "please provide email, or phone no", path: ["mobile", "email"] }
  )
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
 * item group
 */
export const itemGroupSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(60),
  alias: z.string().max(60).optional(),
  stamp: z.number().optional(),
  parent_id: z.number().optional(),
  is_parent: z.number().max(60).optional(),
  modified_by: z.number().optional(),
  modified_on: z.date().optional(),
  created_by: z.number().optional(),
  created_on: z.date().optional(),
});

export const currencySchema = z.object({
  id: z.number().optional(),
  symbol: z.string().min(1).max(60).optional(),
  name: z.string().min(1).max(60).optional(),
  shortForm: z.string().min(1).max(60).optional(),
  decimal_places: z.string().min(1).max(60).optional(),
  currency_system: z.string().min(1).max(60).optional(),
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

export const countrySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(60),
  alias: z.string().min(1).max(45),
});

export const stateSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(60),
  alias: z.string().min(1).max(45),
  country_id: z.number(),
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



// export const nameMasterData = z.object({
//   id: z.number().optional(),
//   name: z.string().min(1).max(45),
//   // stamp: z.number().optional(),
//   // created_by:z.string().optional(),
//   // modified_by: z.string().optional(),
//   // created_on: z.date().optional(),
//   // modified_on: z.date().optional(),
// });

/**
 * used for storing name, alias master
 */
export const nameAliasData = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(45),
  alias: z.string().max(45),
});

export const enquirySupportConfig = z.object({
  enquiryReqd: z.boolean().optional(),
  supportReqd: z.boolean().optional(),

  enquiryCloseCall: z.boolean().optional(),
  enquiryMaintainItems: z.boolean().optional(),
  enquirySaveFAQ: z.boolean().optional(),
  enquiryMaintainAction: z.boolean().optional(),

  supportCloseCall: z.boolean().optional(),
  supportMaintainItems: z.boolean().optional(),
  supportSaveFAQ: z.boolean().optional(),
  supportMaintainAction: z.boolean().optional(),

  generalMaintainArea: z.boolean().optional(),
  generalMaintainImage: z.boolean().optional(),
  generalShowList: z.boolean().optional(),
});

export const companySchema = z.object({
  id: z.number().optional(),
  alias: z.string().min(1).max(60),
  name: z.string().min(1, "Please enter company name").max(55),
  add1: z.string().min(1, "Please enter address"),
  add2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  state_id: z.number().optional(),
  country: z.string().optional(),
  country_id: z.number().optional(),
  pincode: z.string().optional(),
  stamp: z.number().optional(),
});

export const inviteUserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Please enter Name").max(45),
  usercontact: z.string().min(1, "Please enter Contact").max(60),
  companyId: z.number(),
  executiveId: z.number().optional(),
  inviteDate: z.date().optional()
}).refine(
    (schema) => {
      return (emailRegex.test(schema.usercontact) || phoneRegex.test(schema.usercontact));
    },
    { message: "Invalid Input Format", path: ["usercontact"] }
  );