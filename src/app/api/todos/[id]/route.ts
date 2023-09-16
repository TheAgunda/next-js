import { NextResponse } from "next/server";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        }
    });
    const todo: Todo = await res.json();
    if (!todo.id) {
        return NextResponse.json({ "message": "Todo not found" });
    }
    return NextResponse.json(todo);
}