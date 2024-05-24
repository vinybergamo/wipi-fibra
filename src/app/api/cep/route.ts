import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
) => {
  let token = ''
  const { zipcode } = await req.json();
  if (!zipcode) {
    return NextResponse.json({ error: "Invalid cep" }, { status: 400 });
  } else {
    try {
      const dataJSON = await fetch(`https://wipi-viabilidade-api.onrender.com/viabilidade/endereco/zipcode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ zipcode: zipcode })
      });
      const data = await dataJSON.json()
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
};