import { getConfigData } from "../controllers/enquiry.controller";

export const regionalDateFormat= async()=>{
    const config_data = await getConfigData();
    const { dateFormat, timeFormat } =JSON.parse(config_data[1].config)?? {};
  
    const timeFormatString = timeFormat
      ? timeFormat === "12 Hours"
        ? "hh:mm A"
        : "HH:mm"
      : "HH:mm";
    const dateTimeFormat = [
      dateFormat || "DD/MM/YYYY", // Add dateFormat if it exists
      timeFormatString, // Add timeFormatString if timeFormat is valid
    ]
      .filter(Boolean)
      .join(" ");

      return dateTimeFormat;
}