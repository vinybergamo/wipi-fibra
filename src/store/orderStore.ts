import { create } from 'zustand'

interface OrderState {
    data: {
        name: string,
        cpfCnpj: string,
        cep: string,
        endereco: string,
        numero: string,
        bairro: string,
        complement: string,
        estado: string,
        cidade: string,
        personType: 'pf'|'pj'|''
    }
    setData: (field: string, data: any) => void,
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
        personType: ''
    },
    setData: (field, newData) => set((state) => ({ data: { ...state.data, [field]: newData } })),
}))