import * as z from "zod";
import * as zs from "../zodschema/zodschema";

export type userSchemaT = z.infer<typeof zs.userSchema>;

export type organisationSchemaT = z.infer<typeof zs.organisationSchema>;

export type contactSchemaT = z.infer<typeof zs.contactSchema>;

export type areaSchemaT = z.infer<typeof zs.areaSchema>;

export type contactGroupSchemaT = z.infer<typeof zs.contactGroupSchema>;

export type optionsDataT = {
    id: number,
    name: string,
    detail?: string
}

export type addEntityDlgT = z.infer<typeof zs.addEntityDlg>;

export type countrySchemaT = z.infer<typeof zs.countrySchema>;

export type stateSchemaT = z.infer<typeof zs.stateSchema>


export type formErrorT = { msg: string; error: boolean };


export type RenderFormFunctionT = (
  fnDialogOpen: (props: any) => void,
  fnDialogValue: (props: any) => void,
  data?: any,
  parentData?: any
) => JSX.Element;

export type masterFormPropsT = {      
    setDialogOpen?: (props: any) => void,
    setDialogValue?: (props: any) => void,
    data?: any
}

export type masterFormPropsWithParentT = masterFormPropsT & {
  parentData?: number
}


// export type masterFormPropsWithParentT = {      
//     setDialogOpen?: (props: any) => void,
//     setDialogValue?: (props: any) => void,
//     data?: any
//     parentData?: number
// }

// // Added parentData property of type number
// export type masterFormPropsWithDataT = {
//   setDialogOpen?: (props: any) => void;
//   setDialogValue?: (props: any) => void;
//   data?: any;
//   parentData?: number;
// };

//Enquiry Schemas
export type enquirySubStatusMasterT = z.infer<typeof zs.enquirySubStatusMaster>;
export type enquiryHeaderSchemaT = z.infer<typeof zs.enquiryHeaderSchema>;
export type enquiryLedgerSchemaT = z.infer<typeof zs.enquiryLedgerSchema>;

// executive schemas
export type executiveSchemaT = z.infer<typeof zs.executiveSchema>;
export type executiveRoleSchemaT = z.infer<typeof zs.executiveRoleSchema>;
export type executiveGroupSchemaT = z.infer<typeof zs.executiveGroupSchema>;
export type executiveDeptSchemaT = z.infer<typeof zs.executiveDeptSchema>;

export type nameMasterDataT = z.infer<typeof zs.nameMasterData>; // for simple name based masters
export type nameAliasDataT = z.infer<typeof zs.nameAliasData>; // for name and alias masters

export type menuOptionT = z.infer<typeof zs.menuOption>;

export type menuTreeT = {
  id: number;
  name: string;
  short_name: string;
  parent_id: number;
  icon: string;
  href: string;
  default_open: number;
  created_on: Date;
  modified_on: Date;
  created_by: number;
  modified_by: number;
  menu_order: number;
  children: menuTreeT[];
};

export type dbInfoT = {
  company_id: number;
  companyName: string;
  db_id: number;
  host: string;
  port: string;
  dbName: string;
};

export type selectKeyValueT = {
  [key: string]: any;
};

export type getContsT = [{
  id: number;
  name: string;
  whatsapp: string;
  email: string 
}]