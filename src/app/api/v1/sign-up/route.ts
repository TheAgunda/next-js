import { connect } from "@/database/Database";

import User from "@/database/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
connect().then((data) => {
    console.log("DD")
});
export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            return NextResponse.json({ error: "User already Exists" }, { status: 400 });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = password;
        newUser.username = username;
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            status: true,
            result: savedUser
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

