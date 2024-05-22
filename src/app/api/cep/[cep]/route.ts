import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { cep: string } }
) => {
  let token = ''
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
    token = res.success.auth.access_token || false
    if (!token) {
      throw new Error('Missing API token');
    }
  } catch (error){
    return NextResponse.json({error}, { status: 400 });
  } finally{
    
      try{
        const dataJSON = await fetch(`https://api.wipi.com.br/public/api/integracao/vtal/endereco?address=${cep}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await dataJSON.json()
        if (data.error && data.error == 'Faça login para continuar.'){
        return NextResponse.json(data, { status: 400 });
        }
        return NextResponse.json(data.success, { status: 200 });
      } catch (error){
        return NextResponse.json({error}, { status: 400 });
      }
    }
  }
};