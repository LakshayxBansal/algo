import { NextResponse } from 'next/server';
// export { default } from 'next-auth/middleware';
// export const config = {
//   matcher: ["/cap", "/cap/enquiry"]
// }
export function middleware(request: Request) {
  const url = new URL(request.url);

  const response = NextResponse.next();
  // Pass pathname and query string as headers
  response.headers.set('x-nextjs-pathname', url.pathname);
  return response;
}



// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.name === "dinesh",
//     },
//   },
// )

// export const config = { matcher: ["/admin"] }
