import { OrderItems } from "@/store/orderStore";

export const sendForm = async (data: { items: OrderItems, trackId: string | null }) => {
    const resJSON = await fetch('/api/n8n', { method: 'POST', body: JSON.stringify(data) })
    console.log(resJSON)
    if (resJSON.status === 200) {
        return true
    } else return false
}