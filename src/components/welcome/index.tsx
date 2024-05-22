import { primaryBtn, secondaryBtn } from "@/components/ui/buttons";
import Image from "next/image";
import Link from "next/link";
import CepInput from "../cepInput";

export default function Welcome() {
  return (
    <main className="flex lg:flex-row flex-col items-center justify-between lg:gap-20 mt-5 w-full pb-14 max-w-[1920px] px-20">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <Image src='/wipi-fibra-logo.png' width={209} height={59} alt='wipi fibra logo' />
        </div>
        <Image src='/woman-img.png' width={767.79} height={783.76} alt='mulher de cabelo cacheado apontando para um celular com um circulo laranja ao fundo' />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="">
          <h1 className="text-dark-grey lg:text-7xl text-5xl lg:text-left text-center font-normal w-full">Seja bem-vindo</h1>
          <h1 className="text-dark-grey lg:text-7xl text-5xl lg:text-left text-center font-normal w-full">a <span className="text-ascents font-bold">Wipi Fibra</span>!</h1>
          <div className="flex flex-col items-center lg:justify-start justify-center gap-5 mt-7 lg:mb-0 mb-10">
            <CepInput/>
          </div>
        </div>
      </div>
    </main>
  );
}
