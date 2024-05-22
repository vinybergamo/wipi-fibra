import Image from "next/image";

export default function Home() {
  return (
    <main className="flex lg:flex-row flex-col items-center justify-between lg:gap-20 mt-5 w-full pb-14 max-w-[1920px] px-20">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full">
          <Image src='/wipi-fibra-logo.png' width={209} height={59} alt='wipi fibra logo' />
        </div>
        <Image src='/woman-img.png' width={767.79} height={783.76} alt='mulher de cabelo cacheado apontando para um celular com um circulo laranja ao fundo' />
      </div>
        <div className="w-full">
            <h1 className="lg:text-4xl 2xl:text-5xl text-3xl font-normal mb-10">
            Poxa, infelizmente ainda não atendemos na sua região, mas conseguimos te atender imediatamente com nosso CHIP.
            </h1>
            <a href="https://checkout.wipimovel.com/" className="cursor-pointer px-10 py-3 bg-ascents-dark rounded-md text-white">
                Pedir Chip
            </a>
        </div>
    </main>
  );
}
