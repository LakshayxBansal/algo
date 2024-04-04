import React from 'react';
import { getSalesPerson, getTicketCategory, getTicketStage, getCustomer} from '../../controllers/masters.controller';
import InputForm from './InputForm';
import { getAppSession } from '../../services/session.service';


export default async function MyForm() {
  const session = await getAppSession();

  if (session && session.dbSession && session.dbSession.dbInfo.dbName) {
      const [salesPerson, catList, ticketStage, customer] = await Promise.all([
        await getSalesPerson(session.dbSession.dbInfo.dbName),
        await getTicketCategory(session.dbSession.dbInfo.dbName, 1),
        await getTicketStage(session.dbSession.dbInfo.dbName, 1),
        await getCustomer(session.dbSession.dbInfo.dbName)
      ]);

    const baseData = {
      salesPerson: salesPerson? JSON.parse(salesPerson) : null,
      catList: catList? JSON.parse(catList): null,
      ticketStages:  ticketStage? JSON.parse(ticketStage): null,
      customer: customer? JSON.parse(customer): null,
    };
    
    return (
      <InputForm 
        baseData={baseData}
        userName={session.session.user?.name!}
      ></InputForm>
    );
  }
};

