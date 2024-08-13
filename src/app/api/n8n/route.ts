import { NextResponse } from "next/server";
import { Consult } from "../../../database/entities/consults";
import { validarCNPJ, validarCPF } from "@/utils/functions";
import AppDataSource from "../../../database";
export const POST = async (
    req: Request,
) => {
    const body = await req.json();
    const { items, trackId } = body
    if (!validarCPF(items.cpfCnpj.replace(/\D/g, '')) && !validarCNPJ(items.cpfCnpj.replace(/\D/g, ''))) {
        return NextResponse.json({ message: 'error, document invalid' }, { status: 401 })
    }
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }
    } catch (err) {
        console.log(err)
    }
    try {
        await fetch(process.env.N8N_URL || '',
            {
                method: 'POST',
                body: JSON.stringify(items)
            })
        if (trackId !== null && AppDataSource.isInitialized) {
            const repository = AppDataSource.getRepository(Consult)
            await repository.update(trackId, {
                biBody: items,
                submitted: true
            })
        }
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error', error }, { status: 400 })
    }
};