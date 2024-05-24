'use client'
import { primaryBtn, secondaryBtn } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { consultarCEP, consultarViabilidade } from "@/utils/functions";
import { useState } from "react";
import CustomInput from "../customInput";
import { useRouter } from "next/navigation";

export default function CepInput() {
    const { data, setData, errors, setError, clearError } = useOrderStore()
    const [loading, setLoading] = useState(false)
    const [multiAddr, setMultiAddr] = useState<any[]>([])
    const [selectedAdd, setSelectedAdd] = useState<string>('')
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

    const getAddress = async (value: string) => {
        const address = await consultarCEP(value.replace(/\D/g, ''))
        if (address.error || !address) {
            setError('cepnotfound', 'CEP não encontrado')
            return
        }
        else {
            setMultiAddr(address.addresses)
            if (address.addresses.length == 1) {
                const addr = address.addresses[0]
                setSelectedAdd(addr.description1)
                const parts = addr.description1.split(',')
                const city = parts[1].split('-')[1].trim()
                const bairro = parts[1].split('-')[0].trim()
                const state = parts[2].split(' (')[0].trim()
                setData('bairro', bairro)
                setData('cidade', city)
                setData('estado', state)
                setData('endereco', parts[0])
            }
        }
    }

    const getViability = async () => {
        const viabilidade = await consultarViabilidade(JSON.stringify({ address: selectedAdd, number: data.numero }))
        setLoading(false)
        if (viabilidade.availabilityDescription.startsWith('Inviável')) {
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
            {errors['cepnotfound'] && <span className="text-xs text-danger font-normal ml-3">{errors['cepnotfound']}</span>}
            {multiAddr.length > 1 &&
                <div className={' w-full flex flex-col'}>
                    <span className='font-medium text-xl text-dark-grey'>Me confirma seu endereço por favor</span>
                    <select id='street-selector'
                        onChange={(e) => {
                            setSelectedAdd(e.target.value)
                            const parts = e.target.value.split(',')
                            const city = parts[1].split('-')[1].trim()
                            const bairro = parts[1].split('-')[0].trim()
                            const state = parts[2].split(' (')[0].trim()
                            setData('bairro', bairro)
                            setData('cidade', city)
                            setData('estado', state)
                            setData('endereco', parts[0])
                            getAddress(e.target.value)
                        }}
                        className="mt-1 block w-full p-2.5 border border-ascents rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-ascents">
                        <option value={''} className='text-xs'>Selecione</option>
                        {multiAddr.map((item, index) => (<option value={item['description' + String(index + 1)]} key={index} className='text-xs'>{item['description' + String(index + 1)]}</option>))}
                    </select>
                </div>
            }
            {selectedAdd != '' &&
                <CustomInput errors={errors['numero']} value={data.numero} onChange={(e) => changeField(e.target.value, 'numero')} label="Agora digite o número da sua residência." placeholder="Digite aqui o número da sua residência"></CustomInput>
            }
            {errors['servidor'] && <span className="text-xs text-danger font-normal ml-3">{errors['servidor']}</span>}
            {selectedAdd && data.numero && <button className={primaryBtn} onClick={getViability}>Consultar</button>}
        </>
    );
}
