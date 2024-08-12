import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/database/entities/admin";
import jwt from "jsonwebtoken";
import ensureConnection from "@/database";

export const POST = async (
    req: NextRequest,
) => {
    const { user, password } = await req.json();
    try {
        await ensureConnection()
        const admin = await Admin.findOneOrFail({ where: { username: user } })
        const match = admin.verifyPassword(password)
        if (match) {
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