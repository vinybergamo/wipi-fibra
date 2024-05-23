import { type NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
) => {
  const { address, number } = await req.json();
  console.log(address, number)
  if (!address && !number) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  } else {
    try{
      const body = {
        address : address,
        number : number
      }
      const dataJSON = await fetch('https://wipi-viabilidade-api.onrender.com/viabilidade/endereco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      console.log(dataJSON)
      const data = await dataJSON.json()
      console.log(data)
      if (data.success == 'OK'){
        return NextResponse.json({availabilityDescription: 'Viável'}, { status: 200 });
      } else {
        return NextResponse.json({availabilityDescription: 'Inviável'}, { status: 200 });
      }
    } catch (error){
      return NextResponse.json({error}, { status: 400 });
    }
  }
};