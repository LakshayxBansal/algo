'use client'
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Link from 'next/link';
import { updateSession } from '../services/session.services';
import { useRouter } from 'next/navigation';


export default function CellDbName(props) {
  const row = props.row;
  const router = useRouter();

  const handleClick = async (event) => {
    event.preventDefault();
    const result = await updateSession(row);
    router.push('/cap');
  }

  return (
    <TableCell>
    <Link href="" onClick={handleClick}>
      {row.nameVal}
    </Link>
  </TableCell>
  );
}