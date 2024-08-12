import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/database/entities/admin";
import ensureConnection from "@/database";

export const POST = async (req: NextRequest) => {
    const { user, password } = await req.json();
    const api_key = req.headers.get('api_key')
    if (!api_key || api_key != process.env.API_KEY) {
        return NextResponse.json({ message: 'invalid API key' }, { status: 400 });
    }
    try {
        await ensureConnection()
        const existingAdmin = await Admin.findOne({ where: { username: user } });
        if (existingAdmin) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }

        const newAdmin = new Admin();
        newAdmin.username = user;
        newAdmin.password = password;
        console.log(newAdmin)
        await Admin.save(newAdmin);

        return NextResponse.json({ message: "Admin created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }
};
