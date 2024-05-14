'use client'
import CityInput from "@/components/cityInput";
import CustomInput from "@/components/customInput";
import CustomInputRadio from "@/components/customInputRadio";
import { primaryBtnSM, secondaryBtnSM } from "@/components/ui/buttons";
import { useOrderStore } from "@/store/orderStore";
import { sendForm } from "@/utils/apiCalls";
import { consultarCEP, validarCNPJ, validarCPF } from "@/utils/functions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Order({ params }: { params: { type: 'pf' | 'pj' } }) {
    const { data, setData, errors, setError, clearError } = useOrderStore()
    const router = useRouter()
    const changeField = (value: string, field: string) => {
        const getAddress = async () => {
            const address = await consultarCEP(value.replace(/\D/g, ''))
            if (address.erro) return
            else {
                setData('bairro', address.bairro)
                setData('cidade', address.localidade)
                setData('estado', address.uf)
                setData('endereco', address.logradouro)
            }
        }
        if (errors[field]) {
            clearError(field)
        }
        setData(field, value)
        if (field === 'cep' && value.replace(/\D/g, '').length == 8) {
            getAddress()
        }
    }

    const handleSubmit = async () => {
        if (!validarCPF(data.cpfCnpj.replace(/\D/g, '')) && !validarCNPJ(data.cpfCnpj.replace(/\D/g, ''))) {
            setError('cpfCnpj', 'Documento inválido')
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
                <CustomInput value={data.cep} onChange={(e) => changeField(e.target.value, 'cep')} mask={[
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
            <div className="flex w-full items-end justify-between mb-10">
                <div className="flex lg:items-center justify-start lg:gap-24 gap-8 w-full lg:flex-row flex-col mt-3">
                    <CustomInputRadio required defaultValue={data.local} label='Sua internet é para...' handleSelect={(value: string) => { changeField(value, 'plano') }}
                        values={[{ value: 'casa', label: 'Casa' }, { value: 'empresa', label: 'Empresa' }]}>
                    </CustomInputRadio>
                    <CustomInputRadio defaultValue={data.plano} label='Qual seu plano?' required handleSelect={(value: string) => { changeField(value, 'plano') }}
                        values={[{ value: '600mb', label: '600 mb' }, { value: '1g', label: '1G' }, { value: '2g', label: '2G' }]}>
                    </CustomInputRadio>
                </div>
                <div className="w-full flex items-center lg:justify-end justify-center gap-5">
                    <Link href={'/'} className={secondaryBtnSM}>Voltar</Link>
                    <input type="submit" className={primaryBtnSM} value={'Concluir'}></input>
                </div>
            </div>
        </form>
    );
}
