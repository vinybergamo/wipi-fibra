import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { Repository } from "typeorm";
import { Consults } from "@/entity/consults";
import { connectDatabase, getConnection } from "../../db/connect";

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
    let consultsRepository: Repository<Consults> | null = null

    try {
        await connectDatabase()
        const connection = await getConnection()
        consultsRepository = connection.getRepository(Consults)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, connectionError: true }, { status: 408 });
    }
    try {
        if (filters) {
            const consults = await consultsRepository.find({ where: { ...filters } })
            return NextResponse.json({ consults }, { status: 200 });
        }
        const consults = await consultsRepository.find()
        return NextResponse.json({ consults }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

};
