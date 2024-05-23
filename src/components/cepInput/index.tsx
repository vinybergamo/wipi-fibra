'use client'
import { primaryBtn, secondaryBtn } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { consultarCEP, consultarViabilidade } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomInput from "../customInput";
import { useRouter } from "next/navigation";

export default function CepInput() {
    const { data, setData, errors, setError, clearError } = useOrderStore()
    const [loading, setLoading]= useState(false)
    const [multiAddr, setMultiAddr]= useState<any[]>([])
    const [selectedAdd, setSelectedAdd]=useState<string>('')
    const router = useRouter()

    const changeField = (value: string, field: string) => {
        if (errors[field]) {
            clearError(field)
        }
        setData(field, value)
        if (field === 'cep' && value.replace(/\D/g, '').length == 8) {
            getAddress(value)
        }
    }

    const getAddress = async (value:string) => {
        const address = await consultarCEP(value.replace(/\D/g, ''))
        if (address.error||!address) return
        else {
            setMultiAddr(address.address)
            if( address.address.length==1){
                const addr = address.address[0]
                setData('bairro', addr.neighborhood)
                setData('cidade', addr.city)
                setData('estado', addr.stateAbbreviation)
                setData('endereco', addr.streetName)
                setSelectedAdd(addr.description)
            }
        }
    }

    const getViability = async()=>{
        const viabilidade = await consultarViabilidade(JSON.stringify({address: selectedAdd, number: data.numero}))
        setLoading(false)
        if(viabilidade.availabilityDescription.startsWith('Inviável')){
            router.push('/inviavel')
        } else {
            setData('viavel', true)
            router.push('/viavel')
        }
    }



  return (
    <>
    <CustomInput errors={errors['cep']} value={data.cep} onChange={(e) => changeField(e.target.value, 'cep')} mask={[
                    /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/
                ]} label="Digite seu CEP para consultarmos a viabilidade." placeholder="Digite aqui o CEP da sua residência"></CustomInput>

    {multiAddr.length>1&&
    <div className={' w-full flex flex-col'}>
        <span className='font-medium text-xl text-dark-grey'>Me confirma seu endereço por favor</span>
        <select id='street-selector'
         onChange={(e) => {
            setSelectedAdd(e.target.value)
            getAddress(e.target.value)
        }}
        className="mt-1 block w-full p-2.5 border border-ascents rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-ascents">
        <option value={''} className='text-xs'>Selecione</option>
        {multiAddr.map((item, index) => (<option value={item.description} key={index} className='text-xs'>{item.description}</option>))}
        </select>
    </div>
    }
    {selectedAdd!=''&&
    <CustomInput errors={errors['numero']} value={data.numero} onChange={(e) => changeField(e.target.value, 'numero')} label="Agora digite o número da sua residência." placeholder="Digite aqui o número da sua residência"></CustomInput>
    }
    {errors['servidor']&&<span className="text-xs text-danger font-normal ml-3">{errors['servidor']}</span>}
    {selectedAdd&&data.numero&&<button className={primaryBtn} onClick={getViability}>Consultar</button>}
    </>
  );
}
