import axios from "axios";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
) => {
  const { zipcode } = await req.json();
  if (!zipcode || zipcode.replace(/\D/g, '').length<8) {
    return NextResponse.json({ error: {message: 'CEP inválido'} }, { status: 400 });
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
      return NextResponse.json({ addresses, token:login.data.success.auth.access_token }, { status: 200 });
    } catch (err: unknown) {
      return NextResponse.json({ error:err }, { status: 400 });
    }
  }
}