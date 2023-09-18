import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout success.",
            status: true,
        });
        response.cookies.set(process.env.JWT_TOKEN_KEY!, "", { httpOnly: true, expires: new Date(0) })
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}