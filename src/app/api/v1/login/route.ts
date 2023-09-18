import { connect } from "@/database/Database";

import User, { IUserModel } from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken"
connect();
export async function POST(request: Request) {
    try {
        const { password, email } = await request.json();
        const user: IUserModel | null = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 400 });
        }
        const isPasswordMatched = await compare(password, user.password);
        if (!isPasswordMatched) {
            return NextResponse.json({ message: "Invalid or incorrect password." }, { status: 401 });
        }
        if (!user.isActivated) {
            return NextResponse.json({ message: "Sorry! Your account is inactive." }, { status: 400 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ message: "Sorry! Your account is not verified." }, { status: 400 });
        }
        //Create the auth token 
        const tokenData = {
            id: user._id,
            user: user.username,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRES_IN })
        const response = NextResponse.json({
            message: "Login success.",
            status: true,
        });
        response.cookies.set(process.env.JWT_TOKEN_KEY!, token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

