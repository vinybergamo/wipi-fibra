import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { cep: string } }
) => {
  const { cep } = params;
  if (!cep) {
    return NextResponse.json({ error: "Invalid cep" }, { status: 400 });
  } else {
    try{
        const email = process.env.WIPI_LOGIN||''
        const password = process.env.WIPI_PASS||''
        const loginBody = {email, password}
      const login = await fetch('https://api.wipi.com.br/public/api/integracao/login', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(loginBody)
    });
      const res = await login.json()
      const token = res.success.auth.access_token || false
      if (!token) {
        throw new Error('Missing API token');
      }
      const dataJSON = await fetch('https://api.wipi.com.br/public/api/integracao/vtal/viabilidade', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({ id: cep.replace(/\D/g, '') })
      });
  
      console.log(dataJSON)
      const data = await dataJSON.json()
      console.log(data)
      return NextResponse.json(data.success, { status: 200 });
    } catch (error){
      return NextResponse.json({error}, { status: 400 });
    }
  }
};