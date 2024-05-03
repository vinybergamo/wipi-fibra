import { NextResponse } from "next/server";

export const POST = async (
    req: Request,
) => {
    const body = await req.json();
    const n8nSend = await fetch(process.env.N8N_URL || 'https://n8n.wipifibra.com/webhook/762e41e1-b5b9-4682-a4bd-6644aa1871e1',
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (n8nSend.status === 200) {
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } else return NextResponse.json({ message: 'error' }, { status: 400 })
};