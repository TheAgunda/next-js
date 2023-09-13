"use client";
import { useState } from "react"

export default function SignUp() {
    const initialState = {
        username: "",
        email: "",
        password: ""
    }
    const [user, setUser] = useState(initialState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user);

    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form onSubmit={handleSubmit} className="z-10 max-w-5xl w-full flex items-center flex-col font-mono text-sm gap-4">
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a href="/" className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0" target="_blank" rel="noopener noreferrer">By <img alt="Vercel Logo" width="100" height="24" decoding="async" data-nimg="1" className="dark:invert" src="/vercel.svg" /></a>
                </div>
                <div className="flex flex-col gap-4 mt-[25px]">
                    <input type="text" placeholder="Username" className=" flex w-full justify-center border-b border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static w-[300px]  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30 outline-0" onChange={(e) => setUser({ ...user, username: e.target.value })} required={true} />
                    <input type="email" placeholder="Email" className=" flex w-full justify-center border-b border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static w-[300px]  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30 outline-0" onChange={(e) => setUser({ ...user, email: e.target.value })} required={true} />
                    <input type="password" placeholder="Password" className=" flex w-full justify-center border-b border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static w-[300px]  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-3 lg:dark:bg-zinc-800/30 outline-0" onChange={(e) => setUser({ ...user, password: e.target.value })} required={true} />
                </div>
                <button type="submit" className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-black dark:from-inherit lg:static w-[150px]  lg:border bg-black text-white font-bold lg:p-3 rounded lg:dark:bg-black outline-0">
                    Sign Up
                </button>
                <p className="mt-3">
                    Get started by editing&nbsp;<a href="/login"><code className="font-mono font-bold">Login</code></a>
                </p>
            </form>
        </main>
    )
}