import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../prisma";
import { compareSync } from "bcrypt";

export const POST = async (
    req: NextRequest,
) => {
    const { user, password } = await req.json();
    function VerifyPassword(userPass: string) {
        return compareSync(password, userPass);
    }
    try {
        const admin = await prisma.admin.findUnique({ where: { username: user } })

        const match = VerifyPassword(admin?.password || '')
        if (match && admin) {
            const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.SECRET_KEY || 'secret', {
                expiresIn: '1d'
            });
            return NextResponse.json({ token }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'invalid password' }, { status: 400 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 400 });
    }
}