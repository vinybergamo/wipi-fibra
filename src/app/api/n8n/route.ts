import { NextResponse } from "next/server";

export const POST = async (
    req: Request,
) => {
    const body = await req.json();
    const n8nSend = await fetch(process.env.N8N_URL || '',
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (n8nSend.status === 200) {
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } else return NextResponse.json({ message: 'error' }, { status: 400 })
};