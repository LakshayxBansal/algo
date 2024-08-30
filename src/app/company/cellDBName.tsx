'use client'
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import selectUserCompany from './SelectCompany';
import {dbInfoT} from '../models/models';
import { Button } from '@mui/material';
import { getSession } from '../services/session.service';

export default function CellDbName(props : {row:dbInfoT, userId: number }) {
  const row = props.row;
  const router = useRouter();

  const handleClick = async (event: any) => {
    event.preventDefault();
    const result = await selectUserCompany(row, props.userId);
    const session = await getSession();
  }

  return (
    // <TableCell>
    <Link href="" onClick={handleClick} style={{"textDecoration": "none"}}>
      {row.companyName}
    </Link>
  // </TableCell>
  );
}