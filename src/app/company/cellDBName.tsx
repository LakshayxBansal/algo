'use client'
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import selectUserCompany from './SelectCompany';
import {dbInfoT} from '../models/models';


export default function CellDbName(props : {row:dbInfoT, userEmail: string }) {
  const row = props.row;
  const router = useRouter();

  const handleClick = async (event: any) => {
    event.preventDefault();
    const result = await selectUserCompany(row, props.userEmail);
  }

  return (
    <TableCell>
    <Link href="" onClick={handleClick}>
      {row.companyName}

    </Link>
  </TableCell>
  );
}