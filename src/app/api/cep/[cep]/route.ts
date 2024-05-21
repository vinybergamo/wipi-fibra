import { type NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { cep: string } }
) => {
  const { cep } = params;
  if (!cep) {
    return NextResponse.json({ error: "Invalid cep" }, { status: 400 });
  } else {
    try{
      const dataJSON = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await dataJSON.json()
      return NextResponse.json(data, { status: 200 });
    } catch (error){
      return NextResponse.json({error}, { status: 400 });
    }
  }
};