import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const popins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Wipi Fibra - Pré cadastro",
  description: "Cadastre-se para receber wipi fibra na sua casa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={popins.className+ "w-full min-h-screen flex flex-col items-center justify-between"}>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
