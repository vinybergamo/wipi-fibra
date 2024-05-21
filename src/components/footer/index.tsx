import { FaFacebookF } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import { TiSocialLinkedin } from "react-icons/ti";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex lg:flex-row flex-col items-center justify-between px-20 py-3 mt-10 bg-[#0A0A0A] w-full">
      <p className={"text-white text-sm text-center lg:font-normal font-sm lg:mb-0 mb-3"}><b>©{year} Wipi Móvel</b> | Todos os direitos reservados</p>
      <div className="flex gap-2">
        <a className="text-[#0A0A0A] bg-white rounded-full flex items-center justify-center w-[26px] h-[26px]" href='https://www.facebook.com/wipioficial' target="_blank"><div className="w-[16px] h-[16px] flex items-center justify-center"><FaFacebookF size={16} /></div></a>
        <a className="text-[#0A0A0A] bg-white rounded-full flex items-center justify-center w-[26px] h-[26px]" href='https://www.instagram.com/somoswipi' target="_blank"><div className="w-[16px] h-[16px] flex items-center justify-center"><ImInstagram size={12} /></div></a>
        <a className="text-[#0A0A0A] bg-white rounded-full flex items-center justify-center w-[26px] h-[26px]" href='https://www.linkedin.com/company/somoswipi/' target="_blank"><div className="w-[16px] h-[16px] flex items-center justify-center"><TiSocialLinkedin size={15} /></div></a>
      </div>
    </footer>
  );
}
