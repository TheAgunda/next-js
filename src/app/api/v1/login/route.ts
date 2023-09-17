import { connect } from "@/database/Database";

import User, { IUserModel } from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
connect();
export async function POST(request: Request) {
    try {
        const { password, email } = await request.json();
        const user: IUserModel | null = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 400 });
        }
        console.log(user)
        const isPasswordMatched = await compare(password, user.password);
        console.log(isPasswordMatched);
        if (!isPasswordMatched) {
            return NextResponse.json({ message: "Invalid or incorrect password." }, { status: 401 });
        }
        if (!user.isActivated) {
            return NextResponse.json({ message: "Sorry! Your account is inactive." }, { status: 400 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ message: "Sorry! Your account is not verified." }, { status: 400 });
        }

        const tokenData ={
            id:user._id,
            user:user.username,
        }
        return NextResponse.json({
            message: "Login success.",
            status: true,
            result: user
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

