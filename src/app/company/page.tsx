import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { logger } from "../utils/logger.utils";
import { getTotalInvite } from "../controllers/user.controller";
import CompanyPage from "./CompanyPage";
import { getCompanyCount } from "../controllers/company.controller";

export const metadata: Metadata = {
    title: 'Manage Company'
}

export default async function Companies(){
    try{
        const session = await getSession();
        if(session){
            const totalInvites = await getTotalInvite();
            const totalCompanies = await getCompanyCount();
            return <CompanyPage totalInvites={totalInvites.rowCount} totalCompanies={Number(totalCompanies[0].rowCount)}/>
        }
    }catch(error){
        logger.error(error);
    }
    redirect("/signin");
}
