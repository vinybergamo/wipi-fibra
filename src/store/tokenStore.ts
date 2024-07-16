import { create } from 'zustand'

interface TokenState {
    token: string|null,
    setToken: (token: string)=>void
}

export const useTokenStore = create<TokenState>()((set) => ({
    token: null,
    setToken: (token:string)=>set(() => ({ token:token })),
}))