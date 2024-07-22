import { NextResponse } from "next/server";

export const POST = async (
    req: Request,
) => {
    const body = await req.json();
    try {
        await fetch(process.env.N8N_URL || '',
            {
                method: 'POST',
                body: JSON.stringify(body)
            })
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error', error }, { status: 400 })
    }
};