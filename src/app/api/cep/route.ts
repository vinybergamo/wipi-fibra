import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export const POST = async (
  req: NextRequest,
) => {
  // const connection = await ensureConnection()
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
        return NextResponse.json({ error: 'API Error' }, { status: 400 });
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
        return NextResponse.json({ error: 'API Error' }, { status: 400 });
      }

      const addresses = response.data.success.address.map(
        (addr: any, index: number) => ({
          [`description${index + 1}`]: addr.description,
        })
      );
      try {
        const consult = await prisma.consult.create({
          data: {
            cep: zipcode,
            founded: true
          }
        })
        return NextResponse.json({ addresses, token: login.data.success.auth.access_token, trackId: consult.id }, { status: 200 });
      } catch (e) {
        return NextResponse.json({ addresses, token: login.data.success.auth.access_token, connection_error: e }, { status: 200 });
      }
    } catch (err: unknown) {
      try {
        await prisma.consult.create({
          data: {
            cep: zipcode,
            founded: false
          }
        })
        return NextResponse.json({ error: err }, { status: 400 });
      } catch (e) {
        return NextResponse.json({ error: err, e }, { status: 400 });
      }
    }
  }
}