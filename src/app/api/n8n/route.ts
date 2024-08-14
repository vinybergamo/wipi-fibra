import { NextResponse } from "next/server";
import { validarCNPJ, validarCPF } from "@/utils/functions";
import { prisma } from "../../../../prisma";
export const POST = async (
    req: Request,
) => {
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
        try {
            if (trackId !== null) {
                await prisma.consult.update({
                    where: { id: trackId }, data: {
                        biBody: items,
                        submitted: true
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error', error }, { status: 400 })
    }
};