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
    return (<>
        <h1>Faça Login Para Continuar</h1>
        <form onSubmit={(e) => makeLogin(e)}>
            <input value={user} onChange={(e) => setUser(e.target.value)} type='text' placeholder="Usuário"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha"></input>
            <input type="submit"></input>
        </form>
        {error !== '' && <p>{error}</p>}
    </>)
}