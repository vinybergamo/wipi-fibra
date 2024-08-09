import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY || 'secret';

export const POST = async (req: NextRequest) => {
    const { token } = await req.json();

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ valid: true, decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ valid: false, message: 'Invalid token' }, { status: 401 });
    }
};
