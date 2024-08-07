import { Consults } from "@/entity/consults";
import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { getRepository, Repository } from "typeorm";
import { connectDatabase, getConnection } from "../db/connect";

export const POST = async (
  req: NextRequest,
) => {
  const body = await req.json();
  const { address, number, trackId } = body
  if (!address && !number) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
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
      let token = body.token
      if (!body.token) {
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
        token = login.data.success.auth.access_token
      }

      const response = await axios.get(
        `https://api.wipi.com.br/public/api/integracao/vtal/endereco?address=${address}&number=${number}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!response.data.success) {
        throw new Error("Api error");
      }
      if (trackId && consultsRepository !== null) {
        await consultsRepository.update(trackId, {
          viability: "Viável"
        })
      }
      return NextResponse.json({ success: "OK", response: response.data }, { status: 200 });
    } catch (error) {
      if (trackId && consultsRepository !== null) {
        await consultsRepository?.update(trackId, {
          viability: "Inviável"
        })
      }
      return NextResponse.json({ error }, { status: 400 });
    }
  }
};