import {getToken} from "next-auth/jwt";
import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = await getToken({req});
    const isLoginPage = pathname.startsWith("/login");
    const isSignupPage = pathname.startsWith("/register");

    const sensitiveRoutes = ["/dashboard"];

    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage || isSignupPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/register/:path*", "/dashboard/:path*"],
};
