import * as z from 'zod';
import * as zs from '../zodschema/zodschema';

export type userT = z.infer<typeof zs.userSchema>;

export type organisationSchemaT = z.infer<typeof zs.organisationSchema>;

export type contactSchemaT = z.infer<typeof zs.contactSchema>;

export type employeeT = z.infer<typeof zs.employeeSchema>;

export type enquirySchemaT = z.infer<typeof zs.enquirySchema>;

export type contactGroupSchemaT = z.infer<typeof zs.contactGroupSchema>;

export type optionsDataT = z.infer<typeof zs.optionsData>;

export type addEntityDlgT = z.infer<typeof zs.addEntityDlg>;
export type enquirySubStatusMasterT = z.infer<typeof zs.enquirySubStatusMaster>;


export type nameMasterDataT = z.infer<typeof zs.nameMasterData>;    // for simple name based masters
export type nameAliasDataT = z.infer<typeof zs.nameAliasData>;     // for name and alias masters

export type menuOptionT = z.infer<typeof zs.menuOption>

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
}

export type dbInfoT = {
    company_id:number,
    companyName: string,
    db_id: number,
    host: string,
    port: string,
    dbName:string
};


