'use client'
import { Poppins } from 'next/font/google';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';

type Option = {
    value: string | number,
    label: string
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
            <span className='font-semibold text-[13px]'>{label}{props.required && <span className='text-ascents'>*</span>}</span>
            <div className='flex items-start flex-col justify-center mt-2'>
                {values.map((item, index) => (
                    <label key={index} className="flex items-center">
                        <input
                            type="radio"
                            name={label}
                            value={item.value}
                            checked={selectedValue === item.value}
                            onChange={() => handleChange(item.value)}
                            className="mr-2"
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
export default CustomInputRadio;
