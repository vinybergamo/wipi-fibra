import { create } from 'zustand'

export interface OrderItems {
    name: string,
    cpfCnpj: string,
    cep: string,
    endereco: string,
    numero: string,
    bairro: string,
    complement: string,
    estado: string,
    cidade: string,
    personType: 'pf' | 'pj' | '',
    plano: string,
    local: string,
    whatsapp: string,
    email: string,
    viavel: boolean,
}
export interface OrderErrors {
    [key: string]: string | false;
}
interface OrderState {
    data: OrderItems,
    errors: OrderErrors,
    setData: (field: string, data: any) => void,
    setError: (field: string, data: any) => void,
    clearError: (field: string) => void,
}

export const useOrderStore = create<OrderState>()((set) => ({
    data: {
        name: '',
        cpfCnpj: '',
        cep: '',
        endereco: '',
        numero: '',
        bairro: '',
        complement: '',
        estado: '',
        cidade: '',
        personType: '',
        plano: '',
        local: '',
        whatsapp: '',
        email: '',
        viavel: false,
    },
    errors: {},
    setData: (field, newData) => set((state) => ({ data: { ...state.data, [field]: newData } })),
    setError: (field, newData) => set((state) => ({ errors: { ...state.errors, [field]: newData } })),
    clearError: (field) => set((state) => ({ errors: { ...state.errors, [field]: false } })),
}))