'use client'
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import selectUserCompany from './SelectCompany';
import {dbInfoT} from '../models/models';
import { Button } from '@mui/material';
import { getSession } from 'next-auth/react';


export default function CellDbName(props : {row:dbInfoT, userId: number }) {
  const row = props.row;
  const router = useRouter();

  const handleClick = async (event: any) => {
    event.preventDefault();
    const result = await selectUserCompany(row, props.userEmail);
    const session = await getSession();
    console.log("Session CellDbName", session);
  }

  return (
    // <TableCell>
    <Link href="" onClick={handleClick} style={{"textDecoration": "none"}}>
      {row.companyName}
    </Link>
  // </TableCell>
  );
}