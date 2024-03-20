import React from 'react';
import { getSalesPerson, getTicketCategory, getTicketStage, getCustomer} from '../lib/actions';
import InputForm from './InputForm';

export default async function MyForm() {
  const salesPerson = JSON.parse(await getSalesPerson()); // Your API endpoint
  const catList = JSON.parse(await getTicketCategory(1));
  const ticketStage = JSON.parse(await getTicketStage(1));
  const customer = JSON.parse(await getCustomer());
  const getCatList = getTicketCategory;

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

