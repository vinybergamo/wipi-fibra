import { Poppins } from 'next/font/google';
import React, { InputHTMLAttributes } from 'react';
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
const popins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {

    return (
        <div className={popins.className + ' w-full flex flex-col'}>
            <span className='font-semibold text-[13px]'>{label}{props.required&&<span className='text-ascents'>*</span>}</span>
            <input {...props} className='text-xs mt-2 focus:outline-0 rounded-sm px-4 py-2 border-ascents border-[1px]'></input>
        </div>
    );
}
export default CustomInput