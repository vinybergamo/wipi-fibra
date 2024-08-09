import { create } from 'zustand'

interface TokenState {
    token: string | null,
    setToken: (token: string) => void
    trackId: string | null
    setTrack: (trackId: string) => void
    adminToken: string | null
    setAdminToken: (adminToken: string | null) => void
}

export const useTokenStore = create<TokenState>()((set) => ({
    token: null,
    setToken: (token: string) => set(() => ({ token: token })),
    trackId: null,
    setTrack: (trackId: string) => set(() => ({ trackId: trackId })),
    adminToken: null,
    setAdminToken: (adminToken: string | null) => set(() => ({ adminToken: adminToken })),
}))