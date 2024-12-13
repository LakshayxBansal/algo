import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps{
    children: ReactNode;
    href:string;
}

export const TransitionLink = ({children,href,...props}:TransitionLinkProps) =>{

    const router = useRouter();
const handleTransiton = (e:React.MouseEvent<HTMLAnchorElement,MouseEvent>)=>{
e.preventDefault();

document.body.classList.add('cursor-wait');


router.push(href);
document.body.classList.remove('cursor-wait');

}


    return(
    <Link onClick={handleTransiton} href={href} {...props}>
        {children}
     </Link>
)

}