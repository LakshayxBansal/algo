import { Metadata } from "next";

export const metadata : Metadata = {
    title : 'Manage Area'
}

export default function ClientLayout({children} : {children?: React.ReactNode}) {
    return children
}