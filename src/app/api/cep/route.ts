import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { Consult } from "@/database/entities/consults";
import ensureConnection from "@/database";



export const POST = async (
  req: NextRequest,
) => {
  const connection = await ensureConnection()
  const { zipcode } = await req.json();
  if (!zipcode || zipcode.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: { message: 'CEP inválido' } }, { status: 400 });
  } else {
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
      if (connection) {
        try {
          const consult = Consult.create({
            cep: zipcode,
            founded: true
          })
          await Consult.save(consult)
          return NextResponse.json({ addresses, token: login.data.success.auth.access_token, trackId: consult.id }, { status: 200 });
        } catch (e) {
          console.log(e)
        }
      }
      return NextResponse.json({ addresses, token: login.data.success.auth.access_token }, { status: 200 });

    } catch (err: unknown) {
      if (connection) {
        try {
          const consult = Consult.create({
            cep: zipcode,
            founded: false
          })
          await Consult.save(consult)
          return NextResponse.json({ error: err }, { status: 400 });
        } catch (e) {
          console.log(e)
        }
      } return NextResponse.json({ error: err }, { status: 400 });
    }
  }
}