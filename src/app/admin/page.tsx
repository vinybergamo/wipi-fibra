'use client'
import { useTokenStore } from "@/store/tokenStore"
import { loginAdmin } from "@/utils/checkAdmin"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminPage() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setAdminToken } = useTokenStore()
    const router = useRouter()

    const makeLogin = async (e: any) => {
        e.preventDefault()
        const token = await loginAdmin(user, password)
        if (!token) {
            setError('Credenciais inválidas')
            return
        }
        localStorage.setItem('admin-token', token)
        setAdminToken(token)
        router.push('/admin/dashboard')
    }
    return (
        <main className="w-full flex flex-col items-center justify-center gap-5 min-h-screen">
            <form onSubmit={(e) => makeLogin(e)} className="flex flex-col gap-3 items-center justify-center bg-grey p-10 rounded-3xl">
                <h1 className="w-full text-lg font-bold">Faça Login Para Continuar</h1>
                <input className="border-2 border-dark-grey-2 px-3 py-2 rounded-lg" value={user} onChange={(e) => setUser(e.target.value)} type='text' placeholder="Usuário"></input>
                <input className="border-2 border-dark-grey-2 px-3 py-2 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha"></input>
                <input className="cursor-pointer bg-ascents rounded-full px-3 py-4 w-full text-white" type="submit"></input>
            </form>
            {error !== '' && <p>{error}</p>}
        </main>
    )
}