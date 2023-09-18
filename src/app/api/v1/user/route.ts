import { connect } from "@/database/Database";
import User from "@/database/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/basic";
connect();
export async function GET(request: NextRequest) {
    try {
        const data = getDataFromToken(request) as any;
        const user = await User.findOne({ _id: data.id });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 400 });
        }
        return NextResponse.json({
            message: "User fetch successfully",
            status: true,
            result: user
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}

