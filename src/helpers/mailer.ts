
import User from "@/database/models/user.model";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export enum EmailType {
    VERIFY = "verify",
    RESET = "reset",
}
type SendEmailOption = {
    email: string;
    emailType: EmailType;
    userID: string;
}
export const sendMail = async ({ email, emailType, userID }: SendEmailOption) => {
    try {
        const hashedToken = await bcrypt.hash(userID.toString(), 10);
        switch (emailType) {
            case EmailType.VERIFY:
                await User.findByIdAndUpdate(userID, {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }, { new: true, runValidators: true });
                break;
            case EmailType.RESET:
                await User.findByIdAndUpdate(userID, {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }, { new: true, runValidators: true });
                break;
        }
        const host = process.env.MAIL_HOST ?? null;
        if (!host) {
            throw new Error("Mail credential not found");
        }
        const transporter = nodemailer.createTransport({
            host: host,
            port: 25,
            // secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
        const mailOption = {
            from: '"Fred Foo 👻" <kiran@freesmtpservers.com>',
            to: email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<p>Click <a href="http://localhost:3000/verify-email?token=${hashedToken}">here !</a></p>`,
        }
        const mailResponse = await transporter.sendMail(mailOption);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}