'use client'
import Viavel from "@/components/viavel";
import { useOrderStore } from "@/store/orderStore";
import { redirect } from "next/navigation";
export default function Home() {
    const { data } = useOrderStore()
    if(!data.viavel){
        redirect('/')
    }
  return (<>
    <Viavel/>
  </>
  );
}
