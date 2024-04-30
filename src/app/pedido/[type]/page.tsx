'use client'
import CustomInput from "@/components/customInput";
import { primaryBtnSM, secondaryBtnSM } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { consultarCEP } from "@/utils/functions";
import Link from "next/link";

export default function Order({ params }: { params: { type: 'pf'|'pj' } }) {
    const {data, setData}= useOrderStore()

    const changeField=(value:string, field: string)=>{
        const getAddress = async()=>{
            const address = await consultarCEP(value)
            if(address.erro) return
            else{
                setData('bairro',address.bairro)
                setData('cidade',address.localidade)
                setData('estado',address.uf)
                setData('endereco',address.logradouro)
            }
        }
        setData(field, value)
        if(field==='cep' && value.length==8){
            getAddress()
        }
    }

  return (
    <main className="w-full lg:px-16 px-4 max-w-[1280px]">
        <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col lg:mb-1 mb-5">
            <CustomInput value={data.name} onChange={(e)=>changeField(e.target.value, 'name')} label={params.type === 'pf'?'Nome':'Razão Social'} required={true} placeholder={params.type === 'pf'?'Digite aqui seu nome':'Digite aqui sua razão social'}></CustomInput>
            <CustomInput value={data.cpfCnpj} onChange={(e)=>changeField(e.target.value, 'cpfCnpj')} label={params.type === 'pf'?'CPF':'CNPJ'} placeholder={params.type === 'pf'?'Digite aqui seu CPF':'Digite aqui o CNPJ da empresa'} required={true}></CustomInput>
            <CustomInput value={data.cep} onChange={(e)=>changeField(e.target.value, 'cep')} label="CEP" required={true} placeholder="Digite aqui o CEP da sua residência"></CustomInput>
        </div>
        <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col lg:mb-1 mb-5">
            <CustomInput value={data.endereco} onChange={(e)=>changeField(e.target.value, 'endereco')} label='Endereço' required={true} placeholder="Digite aqui seu endereço"></CustomInput>
            <CustomInput value={data.numero} onChange={(e)=>changeField(e.target.value, 'numero')} label='Número' required={true} placeholder="Digite aqui o número da residência"></CustomInput>
            <CustomInput value={data.bairro} onChange={(e)=>changeField(e.target.value, 'bairro')} label="Bairro" required={true} placeholder="Digite aqui o bairro da residência"></CustomInput>
        </div>       
        <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col">
            <CustomInput value={data.complement} onChange={(e)=>changeField(e.target.value, 'complement')} label='Complemento' placeholder="Digite aqui o complemento (opcional)"></CustomInput>
            <CustomInput value={data.estado} onChange={(e)=>changeField(e.target.value, 'estado')} label='Estado' required={true} placeholder="Digite aqui seu estado"></CustomInput>
            <CustomInput value={data.cidade} onChange={(e)=>changeField(e.target.value, 'cidade')} label="Cidade" required={true} placeholder="Selecione sua cidade"></CustomInput>
        </div>
        <div className="w-full flex items-center lg:justify-end justify-center gap-5 mt-7 mb-14">
            <Link href={'/'} className={secondaryBtnSM}>Voltar</Link>
            <button className={primaryBtnSM}>Concluir</button>
        </div>
    </main>
  );
}
