import * as React from "react";
import Link from "next/link";
import selectUserCompany, { redirectToPage } from "./SelectCompany";
import { dbInfoT } from "../models/models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CellDbName(props: { row: dbInfoT; userId: number }) {
  const row = props.row;
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleClick = async (event: any) => {
    event.preventDefault();
    const result = await selectUserCompany(row, props.userId);
    if (result) {
      const data = await update();
      if (data) {
        startTransition(() => {
          redirectToPage('/cap')
        })
        
      }
    } else {
      redirectToPage("/error");
    }
  };

  return (
    <>
    {isPending ? (
      <span>Loading...</span>
    ) : row.roleId ? (
      <Link
        href=""
        onClick={handleClick}
        style={{ textDecoration: "none", color: "rgb(59 131 249)" }}
      >
        {row.companyName}
      </Link>
    ) : (
      <Link href="" style={{ textDecoration: "none", cursor: "default" }}>
        {row.companyName}
      </Link>
    )}
  </>
  
  );
}
