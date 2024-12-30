import React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { logger } from "../utils/logger.utils";
import { getTotalInvite } from "../controllers/user.controller";
import CompanyPage from "./CompanyPage";
import { getCompanyCount } from "../controllers/company.controller";
import { LinearProgress } from "@mui/material";

export const metadata: Metadata = {
    title: "Manage Company",
};

export default async function Companies() {
    try {
        const session = await getSession();
        if (session) {
            const [totalInvites, totalCompanies] = await Promise.all([
                getTotalInvite(),
                getCompanyCount(),
                // delay(12000)
            ]);

            return (
                    <React.Suspense fallback={<LinearProgress/>}>
                    <CompanyPage 
                        totalInvites={totalInvites.rowCount || 0} 
                        totalCompanies={Number(totalCompanies[0]?.rowCount || 0)}
                    />
                    </React.Suspense>
            );
        }
    } catch (error) {
        logger.error(error);
    }
    redirect("/signin");
}

