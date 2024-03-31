import React from 'react';
import { getSalesPerson, getTicketCategory, getTicketStage, getCustomer} from '../../controllers/masters.controller';
import InputForm from './InputForm';

export default async function MyForm() {
  const [salesPerson, catList, ticketStage, customer] = await Promise.all([
    JSON.parse(await getSalesPerson()),
    JSON.parse(await getTicketCategory(1)),
    JSON.parse(await getTicketStage(1)),
    JSON.parse(await getCustomer())
  ]);


  const baseData = {
    salesPerson: salesPerson,
    catList: catList,
    ticketStages:  ticketStage,
    customer: customer,
  };
  

  //       <ResponsiveAppBar />
  return (
    <InputForm baseData={baseData}></InputForm>
  );
};

