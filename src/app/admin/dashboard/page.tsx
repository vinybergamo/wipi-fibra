'use client'

import { IFilters } from "@/app/api/admin/consults/route"
import { Consults } from "@/entity/consults"
import { useTokenStore } from "@/store/tokenStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [consults, setConsults] = useState<Consults[]>([])
    const [founded, setFounded] = useState('todos')
    const [viability, setViability] = useState('todos')
    const [submitted, setSubmitted] = useState('todos')
    const { adminToken } = useTokenStore()
    const router = useRouter()

    const changeFilter = (filter: string) => {
        switch (filter) {
            case 'founded':
                founded == 'todos' ? setFounded('não') : founded == 'não' ? setFounded('sim') : setFounded('todos')
                break
            case 'viability':
                viability == 'todos' ? setViability('não') : viability == 'não' ? setViability('sim') : setViability('todos')
                break
            case 'submitted':
                submitted == 'todos' ? setSubmitted('não') : submitted == 'não' ? setSubmitted('sim') : setSubmitted('todos')
                break

        }
    }
    const fetchConsults = async (filters?: IFilters) => {
        const res = await fetch('/api/admin/consults', { method: "POST", body: JSON.stringify({ filters }), headers: { Authorization: `Bearer ${adminToken}` } })
        if (res.status !== 200) {
            router.push('/admin')
            return
        }
        const con = await res.json()
        setConsults(con.consults)
    }

    const logout = () => {
        localStorage.removeItem('admin-token')
        router.push('/admin')
    }

    useEffect(() => {
        if (adminToken !== null) {
            fetchConsults()
        }
    }, [adminToken])

    return (
        <>
            <header className="w-full flex items-center justify-between p-10"><button className="bg-danger text-white rounded-full py-3 px-5" onClick={logout}>Sair</button>
                <h1 className="w-full text-center">Consultas</h1>
            </header>
            <div className="w-full flex items-center justify-around mb-3 pb-3 border-b-2 border-grey">
                <button className="px-4 py-3 rounded-xl bg-ascents text-white" onClick={() => changeFilter('founded')}>Encontrados: {founded}</button>
                <button className="px-4 py-3 rounded-xl bg-ascents text-white" onClick={() => changeFilter('viability')}>Viável: {viability}</button>
                <button className="px-4 py-3 rounded-xl bg-ascents text-white" onClick={() => changeFilter('submitted')}>Enviados: {submitted}</button>
                <button className="px-4 py-3 rounded-xl bg-danger text-white" onClick={() => fetchConsults({
                    founded: founded == 'todos' ? undefined : founded == 'sim',
                    viability: viability == 'todos' ? undefined : viability == 'sim' ? "Viável" : "Inviável",
                    submitted: submitted == 'todos' ? undefined : submitted == 'sim'
                })}>Filtrar</button>
            </div>
            <div className="w-full flex flex-col">
                {consults.map((i, k) => (
                    <div key={k} className="w-full flex items-center justify-around py-2 border-b-2 border-grey">
                        <p>CEP: {i.cep}</p>
                        <p>Encontrado: {i.founded ? "sim" : "não"}</p>
                        <p>Viabilidade: {i.viability ? i.viability : "Vazio"}</p>
                        <p>Enviado: {i.submitted ? "sim" : "não"}</p>
                    </div>
                ))}
            </div>
        </>
    )
}