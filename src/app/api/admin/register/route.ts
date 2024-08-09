import { NextRequest, NextResponse } from "next/server";
import { connectDatabase, getConnection } from "../../db/connect";
import { Admins } from "@/entity/admin";
import { getRepository, Repository } from "typeorm";

export const POST = async (req: NextRequest) => {
    const { user, password } = await req.json();
    let adminRepository: Repository<Admins> | null = null
    const api_key = req.headers.get('api_key')
    if (!api_key || api_key != process.env.API_KEY) {
        return NextResponse.json({ message: 'invalid API key' }, { status: 400 });
    }
    try {
        await connectDatabase();
        const connection = await getConnection();
        adminRepository = getRepository(Admins)

        // Verifica se o usuário já existe
        const existingAdmin = await adminRepository.findOne({ where: { username: user } });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }

        const newAdmin = new Admins();
        newAdmin.username = user;
        newAdmin.password = password;
        console.log(newAdmin)
        await adminRepository.save(newAdmin);

        return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
};
