import { Metadata } from "next";

export const metadata : Metadata = {
    title : 'Manage Product Groups'
}

export default function ClientLayout({children} : {children?: React.ReactNode}) {
    return children
}