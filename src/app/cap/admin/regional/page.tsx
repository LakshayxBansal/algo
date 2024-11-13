import { getRegionalSetting } from "@/app/controllers/config.controller";
import { getSession } from "../../../services/session.service";
import RegionalInfo from "./regionalInfoForm";
import { redirect } from "next/navigation";

export default async function RegionalSettings() {
  const session = await getSession();
  if (session?.user.dbInfo) {
    const data = (await getRegionalSetting())[0];
    data["config"] = JSON.parse(data["config"]);

    return <RegionalInfo data={data} />;
  } else {
    redirect("/signin");
  }
}