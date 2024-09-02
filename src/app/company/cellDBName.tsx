import * as React from 'react';
import Link from 'next/link';
import selectUserCompany, {redirectToCap} from './SelectCompany';
import {dbInfoT} from '../models/models';
import { useSession } from 'next-auth/react';

export default function CellDbName(props : {row:dbInfoT, userId: number }) {
  const row = props.row;

  const {data: session, update} =  useSession();

  const handleClick = async (event: any) => {
    event.preventDefault();
    const result = await selectUserCompany(row, props.userId);
    if(result){
      const data = await update();
      if(data){
        redirectToCap()
      }
    }
  }

  return (
      <Link href="" onClick={handleClick} style={{"textDecoration": "none"}}>
        {row.companyName}
      </Link>
  );
}