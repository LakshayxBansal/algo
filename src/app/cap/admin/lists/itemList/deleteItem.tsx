"use client";

import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import { DeleteItem } from "@/app/controllers/item.controller";

export default function DeleteItemForm(props: {
  open: boolean;
  id: number;
  name: String;
  setDlgValue: Dispatch<SetStateAction<boolean>>;
}) {
  async function handleDelete() {
    await DeleteItem(props.id);
    props.setDlgValue(false);
  }
  return (
    <>
      <Button
        onClick={() => {
          props.setDlgValue(false);
        }}
        color="primary"
      >
        Cancel
      </Button>
      <Button onClick={handleDelete} color="primary" autoFocus>
        Delete
      </Button>
    </>
  );
}
