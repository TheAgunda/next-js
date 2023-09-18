import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get(process.env.JWT_TOKEN_KEY!)?.value || "";
        const encodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return encodedToken;
    } catch (error: any) {
        throw new Error(error.message);
    }
}