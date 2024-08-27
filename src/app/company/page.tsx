import React from 'react';
import { getSession }  from '../services/session.service';
import { redirect } from 'next/navigation';
import { Create } from './Create';


// interface TitleProps {
//   children?: React.ReactNode;
// }
// function Title(props: TitleProps) {
//   return (
//     <Typography component="h2" variant="h6" color="primary" gutterBottom>
//       {props.children}
//     </Typography>
//   );
// }

export default async function Companies() {
  const session = await getSession();
  
  // async function callBackAfterAddCo() {
  //   'use server'
  //   redirect('/company')
  // }

  if (session) {
    // const rows:dbInfoT[] = await getCompanyList(session.user?.email);
    return (
        <Create email={session.user?.email}/>
      // <Paper sx={{ p: 2, height: '100vh'}}>
      //   <React.Fragment>
      //     <Grid sx={{ display: 'flex' }}>
      //       <Title>Choose Company</Title>
      //       {/* <CreateCompanyDialog
      //         email={session.user?.email!}
      //         callBackParent={callBackAfterAddCo}
      //       ></CreateCompanyDialog> */}
      //       <Create email={session.user?.email}/>
        
      //     </Grid>
      //     <Table size="small">
      //       <TableHead>
      //         <TableRow sx={{ '& th': { color: 'black', fontWeight: 'bold' } }}>
      //           <TableCell>Name</TableCell>
      //           <TableCell>DB Name</TableCell>
      //         </TableRow>
      //       </TableHead>
      //       <TableBody>
      //         {rows?.map((row) => (
      //           <TableRow key={row.company_id}>
      //             <CellDbName row={row} userEmail={session.user.email as string}></CellDbName>
      //             <TableCell>{row.dbName}</TableCell>
      //           </TableRow>
      //         ))}
      //       </TableBody>
      //     </Table>
      //   </React.Fragment>
      // </Paper>
    );
  } else {
    redirect('/signin');
  }
}
