import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex lg:flex-row flex-col items-center justify-between lg:px-20 px-4 mt-5 w-full mb-3 max-w-[1280px]">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full">
            <Image src='/wipi-fibra-logo.png' width={115} height={50} alt='wipi fibra logo' />
          </div>
          <Image src='/woman-img.png' width={350} height={350} alt='mulher de cabelo cacheado apontando para um celular com um circulo laranja ao fundo' />
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="">
            <h1 className="text-dark-grey lg:text-5xl text-4xl lg:text-left text-center font-medium w-full">Pré-cadastro</h1>
            <h1 className="text-dark-grey lg:text-5xl text-4xl lg:text-left text-center font-medium w-full">para <span className="text-ascents font-bold">instalação</span>!</h1>
            <p className="mt-3 w-full">Preencha o formulário abaixo para dar início ao<br />
              processo de instalação da Wipi em sua casa</p>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
