'use server'
import React from 'react';
import ContactForm from '../masterForms/contactForm/contactForm';
import {getContactById} from '@/app/controllers/contact.controller'


export default async function ModContactForm(props: {
      setDialogOpen?: (props: any) => void,
      setDialogValue?: (props: any) => void,
      id: string,
    }) {

      const data = await getContactById(props.id);


  return(
    <ContactForm
      setDialogOpen={props.setDialogOpen}
      setDialogValue={props.setDialogValue}
      
    />
  );
}

