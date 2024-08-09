'use client'
import { primaryBtn, secondaryBtn } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { consultarCEP, consultarViabilidade } from "@/utils/functions";
import { useState } from "react";
import CustomInput from "../customInput";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { useTokenStore } from "@/store/tokenStore";

export default function CepInput() {
    const { data, setData, errors, setError, clearError } = useOrderStore()
    const { setToken, token, trackId, setTrack } = useTokenStore()
    const [loading, setLoading] = useState(false)
    const [multiAddr, setMultiAddr] = useState<any[]>([])
    const [selectedAdd, setSelectedAdd] = useState<string>('')
    const router = useRouter()

    const changeField = (value: string, field: string) => {
        if (errors[field]) {
            clearError(field)
        }
        setData(field, value)
    }

    const getAddress = async (value: string) => {
        if (loading) return
        setLoading(true)
        const address = await consultarCEP(value.replace(/\D/g, ''))
        if (address.error) {
            setError('cepnotfound', address.error.message === 'Request failed with status code 404' ? 'CEP não encontrado' : address.error.message)
        }
        else {
            clearError('cepnotfound')
            setMultiAddr(address.addresses)
            if (address.trackId) {
                setTrack(address.trackId)
            }
            setToken(address.token)
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
        setLoading(false)
    }

    const getViability = async () => {
        if (loading) return
        setLoading(true)
        const viabilidade = await consultarViabilidade(JSON.stringify({ address: selectedAdd, number: data.numero, token, trackId }))
        if (viabilidade.availabilityDescription.startsWith('Inviável')) {
            router.push('/inviavel')
        } else {
            setData('viavel', true)
            router.push('/viavel')
        }
        setLoading(false)
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
                        }}
                        className="mt-1 block w-full p-2.5 border border-ascents rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-ascents">
                        <option value={''} className='text-xs'>Selecione</option>
                        {multiAddr.map((item, index) => (
                            <option value={item['description' + String(index + 1)]} key={index} className='text-xs'>{item['description' + String(index + 1)]}</option>))}
                    </select>
                </div>
            }
            {selectedAdd != '' && !errors['cepnotfound'] &&
                <CustomInput errors={errors['numero']} value={data.numero} onChange={(e) => changeField(e.target.value, 'numero')} label="Agora digite o número da sua residência." placeholder="Digite aqui o número da sua residência"></CustomInput>
            }
            {errors['servidor'] && <span className="text-xs text-danger font-normal ml-3">{errors['servidor']}</span>}
            {selectedAdd && data.numero && !errors['cepnotfound'] && <button disabled={loading} className={primaryBtn + ' w-full'} onClick={getViability}>{loading ? <Loading /> : 'Consultar'}</button>}
            {multiAddr.length == 0 && !selectedAdd && <button disabled={loading} className={primaryBtn + ' w-full'} onClick={() => getAddress(data.cep)}>{loading ? <Loading /> : 'Pesquisar CEP'}</button>}
        </>
    );
}
