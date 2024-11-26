import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getCountryIdByName } from '@/app/controllers/masters.controller';
import { getCountryByIp } from '@/app/controllers/company.controller';

export async function GET(request: NextRequest) {
  // const result = await getCountryByIp(request);
  // console.log(result);
  
  // return result;
  // const requestHeaders = headers()
  // const ip = requestHeaders.get("x-forwarded-for");
  // const fetchedData = await fetch(`https://api.ipregistry.co/${ip}?key=ira_LZvLD3Bhm00twdQUfDf64i8ymemjFM0HqXhV`);
  // const data = await fetchedData.json();
  // const country = data.location.country;
  // const countryId = await getCountryIdByName(country);
  // return new Response(
  //   JSON.stringify({ ip })
  // );
  // return {country, countryId};
}
  

