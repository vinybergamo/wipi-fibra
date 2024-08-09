import { NextResponse } from "next/server";
import { connectDatabase, getConnection } from "../db/connect";
import { getRepository, Repository } from "typeorm";
import { Consults } from "@/entity/consults";
import { validarCNPJ, validarCPF } from "@/utils/functions";

export const POST = async (
    req: Request,
) => {
    const body = await req.json();
    const { items, trackId } = body
    if (!validarCPF(items.cpfCnpj.replace(/\D/g, '')) && !validarCNPJ(items.cpfCnpj.replace(/\D/g, ''))) {
        return NextResponse.json({ message: 'error, document invalid' }, { status: 401 })
    }
    let consultsRepository: Repository<Consults> | null = null
    try {
        await connectDatabase()
        const connection = await getConnection()
        consultsRepository = getRepository(Consults)
        console.log(consultsRepository)
    } catch (error) {
        console.log(error)
    }
    try {
        await fetch(process.env.N8N_URL || '',
            {
                method: 'POST',
                body: JSON.stringify(items)
            })
        if (trackId !== null && consultsRepository !== null) {
            await consultsRepository.update(trackId, {
                biBody: items,
                submitted: true
            })
        }
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (trackId !== null && consultsRepository !== null) {
            await consultsRepository.update(trackId, {
                submitted: false
            })
        }
        return NextResponse.json({ message: 'error', error }, { status: 400 })
    }
};