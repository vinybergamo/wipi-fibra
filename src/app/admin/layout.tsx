'use client'

import { useTokenStore } from "@/store/tokenStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { adminToken, setAdminToken } = useTokenStore()
  const router = useRouter()
  useEffect(() => {
    const getAdminLogged = async () => {
      const admTKN = adminToken || localStorage.getItem('admin-token')
      if (admTKN) {
        setAdminToken(admTKN)
        router.push('/admin/dashboard')
      }
    }
    getAdminLogged()
  }, [])
  return (
    <section className="w-full">
      {children}
    </section>
  );
}
