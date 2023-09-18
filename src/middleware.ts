import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(path);
    const isPublicPath = path === "/login" || path === "/sign-up";
    const token = request.cookies.get(process.env.JWT_TOKEN_KEY!)?.value || '';
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup"
    ],
}