import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma";
export const POST = async (
  req: NextRequest,
) => {
  // const connection = await ensureConnection()
  const body = await req.json();
  const { address, number, trackId } = body
  if (!address && !number) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  } else {
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
      try {

        if (trackId) {
          await prisma.consult.update({
            where: { id: trackId }, data: {
              viability: "Viável",
              address: `${address}, ${number}`
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
      return NextResponse.json({ success: "OK", response: response.data, trackId }, { status: 200 });
    } catch (error) {
      try {
        if (trackId) {
          await prisma.consult.update({
            where: { id: trackId }, data: {
              viability: "Inviável",
              address: `${address}, ${number}`
            }
          })
        }
      } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
      }
      return NextResponse.json({ error }, { status: 400 });
    }
  }
};