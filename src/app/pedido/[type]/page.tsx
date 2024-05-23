'use client'
import CityInput from "@/components/cityInput";
import CustomInput from "@/components/customInput";
import CustomInputRadio from "@/components/customInputRadio";
import { primaryBtnSM, secondaryBtnSM } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { sendForm } from "@/utils/apiCalls";
import { consultarCEP, consultarViabilidade, validarCNPJ, validarCPF } from "@/utils/functions";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Order({ params }: { params: { type: 'pf' | 'pj' } }) {
    const { data, setData, errors, setError, clearError } = useOrderStore()
    if(!data.viavel){
        redirect('/')
    }
    const [availablePlans, setAvailablePlans]=useState<any>([])
    const router = useRouter()
    const changeField = (value: string, field: string) => {
        if (errors[field]) {
            clearError(field)
        }
        setData(field, value)

    }
    const handleSubmit = async () => {
        if (!validarCPF(data.cpfCnpj.replace(/\D/g, '')) && !validarCNPJ(data.cpfCnpj.replace(/\D/g, ''))) {
            setError('cpfCnpj', 'Documento inválido')
            return
        } else if(errors.cep&&errors.cep =='Instalação indisponível para o endereço fornecido'){
            setError ('tecnical', errors.cep )
            return
        }
        setData('personType', params.type)
        setData('cpfCnpj', data.cpfCnpj.replace(/\D/g, ''))
        setData('cep', data.cep.replace(/\D/g, ''))
    }
    const send = async () => {
        const res = await sendForm(data)
        setData('personType', '')
        if (res) router.push('/obrigado')
    }
    useEffect(() => {
        if (data.personType !== '') {
            send()
        }
    }, [data])

    return (
        <form className="w-full lg:px-20 px-10 max-w-[1920px]" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col mb-5">
                <CustomInput value={data.name} onChange={(e) => changeField(e.target.value, 'name')} label={params.type === 'pf' ? 'Nome' : 'Razão Social'} required={true} placeholder={params.type === 'pf' ? 'Digite aqui seu nome' : 'Digite aqui sua razão social'}></CustomInput>
                <CustomInput errors={errors['cpfCnpj']} value={data.cpfCnpj} onChange={(e) => changeField(e.target.value, 'cpfCnpj')} mask={params.type == 'pf' ? [
                    /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/
                ] : [
                    /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/
                ]} label={params.type === 'pf' ? 'CPF' : 'CNPJ'} placeholder={params.type === 'pf' ? 'Digite aqui seu CPF' : 'Digite aqui o CNPJ da empresa'} required={true}></CustomInput>
                <CustomInput errors={errors['cep']} value={data.cep} onChange={(e) => changeField(e.target.value, 'cep')} mask={[
                    /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/
                ]} label="CEP" required={true} placeholder="Digite aqui o CEP da sua residência"></CustomInput>
            </div>
            <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col mb-5">
                <CustomInput value={data.endereco} onChange={(e) => changeField(e.target.value, 'endereco')} label='Endereço' required={true} placeholder="Digite aqui seu endereço"></CustomInput>
                <CustomInput value={data.numero} onChange={(e) => changeField(e.target.value, 'numero')} label='Número' required={true} placeholder="Digite aqui o número da residência"></CustomInput>
                <CustomInput value={data.bairro} onChange={(e) => changeField(e.target.value, 'bairro')} label="Bairro" required={true} placeholder="Digite aqui o bairro da residência"></CustomInput>
            </div>
            <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col">
                <CustomInput value={data.complement} onChange={(e) => changeField(e.target.value, 'complement')} label='Complemento' placeholder="Digite aqui o complemento (opcional)"></CustomInput>
                <CustomInput value={data.estado} onChange={(e) => changeField(e.target.value, 'estado')} label='Estado' required={true} placeholder="Digite aqui seu estado"></CustomInput>
                <CityInput label="Cidade" required={true} placeholder="Selecione sua cidade"></CityInput>
            </div>
            <h1 className="text-[32px] w-full text-start font-light my-5">Dados para <span className="text-ascents font-bold">contato</span></h1>
            <div className="flex items-center justify-center gap-5 w-full lg:flex-row flex-col lg:mb-1 mb-5">
                <CustomInput mask={[
                    '(', /[0-9]/, /[0-9]/, ')', /[0-9]/, '\u00A0', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/
                ]} value={data.whatsapp} onChange={(e) => changeField(e.target.value, 'whatsapp')} label='Número de WhatsApp' required={true} placeholder="(99)9 9999-9999" type="tel"></CustomInput>
                <CustomInput type="email" value={data.email} onChange={(e) => changeField(e.target.value, 'email')} label='E-mail' required={true} placeholder="Digite aqui o seu e-mail"></CustomInput>
            </div>
            <h1 className="text-[32px] w-full text-start font-light my-5">Monte seu <span className="text-ascents font-bold">plano</span></h1>
            <div className="flex xl:flex-row flex-col gap-5 w-full items-end justify-between">
                <div className="flex lg:items-center justify-start lg:gap-24 gap-8 w-full lg:flex-row flex-col mt-3">
                    <CustomInputRadio required defaultValue={data.local} label='Sua internet é para...' handleSelect={(value: string) => { changeField(value, 'plano') }}
                        values={[{ value: 'casa', label: 'Casa' }, { value: 'empresa', label: 'Empresa' }]}>
                    </CustomInputRadio>
                    <CustomInputRadio defaultValue={data.plano} label='Qual seu plano?' required handleSelect={(value: string) => { changeField(value, 'plano') }}
                        values={availablePlans.length>0?availablePlans:[
                        { value: '600 mega - R$ 109,00 por mês', label: '600 mega - R$ 109,00 por mês' }, 
                        { value: '1 Giga - R$ 169,00 por mês', label: '1 Giga - R$ 169,00 por mês' }, 
                        { value: '2 Gigas - R$ 269,00 por mês', label: '2 Gigas - R$ 269,00 por mês' }]}>
                    </CustomInputRadio>
                </div>
                <div className="w-[90%] flex items-center lg:justify-end justify-center gap-5 flex-wrap">
                    <Link href={'/'} className={secondaryBtnSM}>Voltar</Link>
                    <input type="submit" className={primaryBtnSM} value={'Concluir'}></input>
                </div>
            </div>
                    {errors['tecnical']?<p className="text-xs text-danger w-full text-center lg:text-end mt-5">{errors['tecnical']}</p>:""}
        </form>
    );
}
