import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { prisma } from "../../../../../prisma";

const JWT_SECRET = process.env.SECRET_KEY || 'secret';

export interface IFilters {
    founded?: boolean,
    viability?: string,
    submitted?: boolean
}

export const POST = async (req: NextRequest) => {
    const token = `${req.headers.get('Authorization')?.split(' ')[1]}`
    const { filters }: {
        filters?: IFilters
    } = await req.json()
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        if (filters) {
            const consults = await prisma.consult.findMany({ where: { ...filters } })
            return NextResponse.json({ consults }, { status: 200 });
        }
        const consults = await prisma.consult.findMany()
        return NextResponse.json({ consults }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

};
