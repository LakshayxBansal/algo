import { NextResponse, NextRequest } from 'next/server'
import {getSessionCookies} from './app/lib/cookies';
 
export async function middleware(request: NextRequest) {
  const currentUser = await getSessionCookies(request);
 
  //const currentUser = true;
  console.log(currentUser);
  /*
  if (!currentUser) {
    return NextResponse.redirect(new URL('/signin', request.url));
    //return NextResponse.redirect(new URL('/dashboard', request.url));
  }*/
  NextResponse.next();
}


export const config = {
  matcher: ['/((?!api|_next/static|signin|signup|congrats|_next/images|.*\\.jpg$|.*\\.png$).*)'],
}


/*
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
/*    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

*/