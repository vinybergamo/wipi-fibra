import { primaryBtn, secondaryBtn } from "@/components/ui/buttons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex lg:flex-row flex-col items-center justify-between lg:px-20 px-4 mt-5 w-full pb-14 max-w-[1280px]">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <Image src='/wipi-fibra-logo.png' width={115} height={50} alt='wipi fibra logo' />
        </div>
        <Image src='/woman-img.png' width={500} height={500} alt='mulher de cabelo cacheado apontando para um celular com um circulo laranja ao fundo' />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="">
          <h1 className="text-dark-grey lg:text-5xl text-4xl lg:text-left text-center font-medium w-full">Pré-cadastro</h1>
          <h1 className="text-dark-grey lg:text-5xl text-4xl lg:text-left text-center font-medium w-full">para <span className="text-ascents font-bold">instalação</span>!</h1>
          <p className="mt-3 w-full lg:text-left text-center">Preencha o formulário abaixo para dar início ao<br />
            processo de instalação da Wipi em sua casa</p>
          <div className="flex gap-5 mt-5 lg:mb-0 mb-10">
            <Link href='/pedido/pf' className={primaryBtn}>Sou PF</Link>
            <Link href='/pedido/pj' className={secondaryBtn}>Sou PJ</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
