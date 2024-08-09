import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../db/connect";
import { Admins } from "@/entity/admin";
import { Repository } from "typeorm";
import jwt from "jsonwebtoken";

export const POST = async (
    req: NextRequest,
) => {
    const { user, password } = await req.json();
    let adminRepository: Repository<Admins> | null = null
    try {
        const connection = await connectDatabase()
        adminRepository = connection.getRepository(Admins)
        const admin = await adminRepository.findOneOrFail({ where: { username: user } })
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