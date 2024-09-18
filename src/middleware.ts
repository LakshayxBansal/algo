export { default } from 'next-auth/middleware';
export const config = {
  matcher: ["/cap", "/cap/enquiry"]
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
