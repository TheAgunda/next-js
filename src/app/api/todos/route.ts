import { NextResponse } from "next/server";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: Todo[] = await res.json();
    return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();
    if (!id) return NextResponse.json({ "message": "Todo id is required." });
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        }
    });
    return NextResponse.json({ "message": "Todo deleted" });
}
export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json();
    if (!userId) return NextResponse.json({ "message": "User id is required." });
    if (!title) return NextResponse.json({ "message": "Title is required." });
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: "POST",
        body: JSON.stringify({ userId, title, completed: false }),
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        }
    });
    const storedTodo = await res.json();
    return NextResponse.json(storedTodo);
}

export async function PUT(request: Request) {
    const { userId, title, id, completed }: Todo = await request.json();
    if (!userId) return NextResponse.json({ "message": "User id is required." });
    if (!title) return NextResponse.json({ "message": "Title is required." });
    if (!id) return NextResponse.json({ "message": "Title is required." });
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ userId, title, completed: false }),
        headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
        }
    });
    const updatedTodo: Todo = await res.json();
    return NextResponse.json(updatedTodo);
}