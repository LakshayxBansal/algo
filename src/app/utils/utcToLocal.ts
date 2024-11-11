import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


export function adjustToLocal(date: any) {
    const localDate = dayjs.utc(`${date}Z`).local();
    return localDate;
}