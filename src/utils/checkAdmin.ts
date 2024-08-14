export const checkAdminToken = async (token: string): Promise<boolean> => {
    const res = await fetch('/api/admin/verify', { method: 'POST', body: JSON.stringify({ token }) })
    const result = await res.json()
    return result.valid || false
}

export const loginAdmin = async (user: string, password: string) => {
    const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ user, password }) })
    const { token } = await res.json()
    if (token) return token
    return false
}

export const registerAdmin = async (user: string, password: string) => {
    const res = await fetch('/api/admin/register', { method: 'POST', body: JSON.stringify({ user, password }), headers: { "api_key": process.env.API_KEY || 'api_key' } })
}

