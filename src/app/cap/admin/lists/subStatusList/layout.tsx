import { Metadata } from "next";

export const metadata : Metadata = {
    title : 'Manage Sub Status'
}

export default function ClientLayout({children} : {children?: React.ReactNode}) {
    return children
}