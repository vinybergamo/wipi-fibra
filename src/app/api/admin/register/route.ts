import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import { genSaltSync, hashSync } from "bcrypt";

export const POST = async (req: NextRequest) => {
    const { user, password } = await req.json();
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

        const existingAdmin = await prisma.admin.findUnique({ where: { username: user } });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }
        await prisma.admin.create({
            data: {
                username: user,
                password: HashPassword(password)
            }
        })
        return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
};
