import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import { genSaltSync, hashSync } from "bcrypt";

export const POST = async (
    req: NextRequest,
) => {
    const { data } = await req.json();
    const api_key = req.headers.get('api_key')
    if (!api_key || api_key != process.env.API_KEY) {
        return NextResponse.json({ message: 'invalid API key' }, { status: 400 });
    }
    function HashPassword(pass: string) {
        const salt = genSaltSync();
        const hash = hashSync(pass, salt);
        return hash
    }
    try {
        if (data.password) {
            data.password = HashPassword(data.password)
        }
        const admin = await prisma.admin.update({ where: { username: data.username as string }, data })
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 400 });
    }
}