import { connect } from "@/database/Database";
import User from "@/database/models/user.model";
import { NextResponse } from "next/server";
connect();
export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json();
        const isExist = await User.findOne({ email: email });
        const isUsernameExist = await User.findOne({ username: username });
        if (isExist) {
            return NextResponse.json({ message: "Email already exists." }, { status: 400 });
        }
        if (isUsernameExist) {
            return NextResponse.json({ message: "Username already exists." }, { status: 400 });
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
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

