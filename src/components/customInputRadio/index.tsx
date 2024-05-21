'use client'
import { Poppins } from 'next/font/google';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

type Option = {
    value?: string | number,
    label?: string,
    codigo?: string | number,
    descricao?: string,
    preco?:string
}

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    values: Option[];
    handleSelect: any;

}
const popins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

const CustomInputRadio: React.FC<CustomInputProps> = ({ label, values, handleSelect, ...props }) => {
    const { defaultValue } = props;
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    useEffect(() => {
        handleSelect(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (value: string | number) => {
        setSelectedValue(value);
        handleSelect(value);
    };

    return (
        <div className={popins.className + ' w-full flex flex-col'}>
            <span className='font-medium text-2xl'>{label}{props.required && <span className='text-ascents'>*</span>}</span>
            <div className='flex items-center justify-start gap-5 mt-2 w-full flex-wrap'>
                {values.map((item, index) => (
                    <label key={index} className={`flex items-center lg:text-2xl text-xl opacity-50 checked:opacity-100`}>
                        <input
                            type="radio"
                            name={label}
                            value={item.value||item.codigo}
                            checked={selectedValue === item.value || selectedValue===item.codigo}
                            onChange={() => handleChange(item.value||item.codigo||'')}
                            className={`mr-3 w-5 h-5 checked:opacity-100 `}
                        />
                        <span className='text-nowrap'>{item.label||item.descricao?.replace('WIPI FIBRA RN-RJ ','')}</span>
                        {item.preco&&<p> - R${item.preco.replace('.',',')}</p>}
                    </label>
                ))}
            </div>
        </div>
    );
}
export default CustomInputRadio;
