import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { connectDatabase, getConnection } from "../db/connect";
import { getRepository, Repository } from "typeorm";
import { Consults } from "@/entity/consults";

export const POST = async (
  req: NextRequest,
) => {
  const { zipcode } = await req.json();
  if (!zipcode || zipcode.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: { message: 'CEP inválido' } }, { status: 400 });
  } else {
    let consultsRepository: Repository<Consults> | null = null
    try {
      await connectDatabase()
      const connection = await getConnection()
      consultsRepository = getRepository(Consults)
    } catch (error) {
      console.log(error)
    }
    try {

      const login = await axios.post(
        "https://api.wipi.com.br/public/api/integracao/login",
        {
          email: process.env.WIPI_LOGIN,
          password: process.env.WIPI_PASS,
        }
      );
      if (!login.data.success) {
        throw new Error("Api error");
      }

      const response = await axios.get(
        `https://api.wipi.com.br/public/api/integracao/vtal/endereco?address=${zipcode.replace(/\D/g, '')}`,
        {
          headers: {
            Authorization: "Bearer " + login.data.success.auth.access_token,
          },
        }
      );
      if (!response.data.success) {
        throw new Error("Api error");
      }

      const addresses = response.data.success.address.map(
        (addr: any, index: number) => ({
          [`description${index + 1}`]: addr.description,
        })
      );

      if (consultsRepository !== null) {
        const saved = await consultsRepository.save(consultsRepository.create({
          cep: zipcode,
          founded: true
        }))
        return NextResponse.json({ addresses, token: login.data.success.auth.access_token, trackId: saved.id }, { status: 200 });
      }
      return NextResponse.json({ addresses, token: login.data.success.auth.access_token }, { status: 200 });
    } catch (err: unknown) {
      if (consultsRepository !== null) {
        await consultsRepository.save(consultsRepository.create({
          cep: zipcode,
          founded: false
        }))
      }
      return NextResponse.json({ error: err }, { status: 400 });
    }
  }
}