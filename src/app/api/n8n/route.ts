import { NextResponse } from "next/server";
import { Consult } from "@/database/entities/consults";
import { validarCNPJ, validarCPF } from "@/utils/functions";
import ensureConnection from "@/database";
export const POST = async (
    req: Request,
) => {
    // const connection = await ensureConnection()
    const body = await req.json();
    const { items, trackId } = body
    if (!validarCPF(items.cpfCnpj.replace(/\D/g, '')) && !validarCNPJ(items.cpfCnpj.replace(/\D/g, ''))) {
        return NextResponse.json({ message: 'error, document invalid' }, { status: 401 })
    }
    try {
        await fetch(process.env.N8N_URL || '',
            {
                method: 'POST',
                body: JSON.stringify(items)
            })
        // if (trackId !== null && connection) {
        //     await Consult.update(trackId, {
        //         biBody: items,
        //         submitted: true
        //     })
        // }
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        // if (trackId !== null && connection) {
        //     await Consult.update(trackId, {
        //         submitted: false
        //     })
        // }
        return NextResponse.json({ message: 'error', error }, { status: 400 })
    }
};