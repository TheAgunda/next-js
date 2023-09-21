import { connect } from "@/database/Database";
import User from "@/database/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/basic";
connect();
export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 400 });
        }
        user.isVerified = true;
        user.isActivated = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const savedUser = await user.save();
        return NextResponse.json({
            message: "Email verified successfully.",
            status: true,
            result: {}
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

