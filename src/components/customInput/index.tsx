import { Poppins } from 'next/font/google';
import React, { InputHTMLAttributes } from 'react';
import MaskedInput, { Mask } from 'react-text-mask'
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    mask?:Mask;
    errors?:string|false
}
const popins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

const CustomInput: React.FC<CustomInputProps> = ({ label,mask, errors,...props }) => {

    return (
        <div className={popins.className + ' w-full flex flex-col'}>
            <span className='font-semibold text-[13px]'>{label}{props.required&&<span className='text-ascents'>*</span>}
            {errors&&<span className="text-xs text-danger font-normal ml-3">{errors}</span>}</span>
            {mask?
            <MaskedInput
            placeholderChar=' '
            mask={mask}
            {...props} className={`text-xs mt-2 focus:outline-0 rounded-sm px-4 py-2 border-[1px] ${errors?'border-danger':'border-ascents'}`}></MaskedInput>
            :<input {...props} className='text-xs mt-2 focus:outline-0 rounded-sm px-4 py-2 border-ascents border-[1px]'></input>}
        </div>
    );
}
export default CustomInput