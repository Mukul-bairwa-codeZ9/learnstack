import {
  NextRequest,
  NextResponse,
} from "next/server";

export function middleware(
  request: NextRequest,
) {
  const token =
    request.cookies.get(
      "accessToken",
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  const protectedRoutes =
    [
      "/dashboard",
      "/workspaces",
      "/docs",
      "/settings",
    ];

  const isProtected =
    protectedRoutes.some(
      route =>
        pathname.startsWith(
          route,
        ),
    );

  if (
    isProtected &&
    !token
  ) {
    return NextResponse.redirect(
      new URL(
        "/sign-in",
        request.url,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workspaces/:path*",
    "/docs/:path*",
    "/settings/:path*",
  ],
};