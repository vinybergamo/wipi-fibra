import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { Consult } from "../../../../database/entities/consults";
import AppDataSource from "../../../../database";

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
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
        const repository = AppDataSource.getRepository(Consult)
        if (filters) {
            const consults = await repository.find({ where: { ...filters } })
            return NextResponse.json({ consults }, { status: 200 });
        }
        const consults = await repository.find()
        return NextResponse.json({ consults }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

};
