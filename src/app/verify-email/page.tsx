"use client";
import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('api/v1/verify-email', { token });
            setVerified(true);
            toast.success("Email verified successfully.")
            router.push("/login")
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full flex items-center flex-col font-mono text-sm gap-4">
                <h1>Verify your email</h1>
            </div>
        </main>
    )
}