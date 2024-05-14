'use client'
import { useOrderStore } from '@/store/orderStore';
import { Poppins } from 'next/font/google';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#E77100',
      light: '#E77100',
      dark: '#E77100',
      contrastText: '#E77100',
    }
  },
});

interface CityInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string | false
}
const popins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ['latin'] });

const getCities = async () => {
  const citiesjson = await fetch('/estados-cidades.json')
  const cities = await citiesjson.json()
  return cities
}

const CityInput: React.FC<CityInputProps> = ({ label, errors, ...props }) => {
  const { data, setData } = useOrderStore()
  const [estados, setEstados] = useState<any>([])
  const [cities, setCities] = useState<any>([])
  const fetchCities = async () => {
    const states = await getCities()
    if (states) {
      setEstados(states.estados)
      findState('RJ', states.estados)
    }
  }
  const findState = (estado: string, states?: any) => {
    const estadosCopy = states || estados
    const stt = estadosCopy.filter((i: { sigla: string, nome: string }) => i.sigla == estado.toUpperCase() || i.nome.toLowerCase() == estado.toLowerCase())
    setCities(stt[0]?.cidades || [])
  }
  useEffect(() => {
    fetchCities()
  }, [])

  useEffect(() => {
    if (data.estado.length >= 2) {
      findState(data.estado)
    }
  }, [data.estado])

  return (
    <ThemeProvider theme={theme}>

      <div className={popins.className + ' w-full flex flex-col'}>

        <span className='font-medium text-xl'>{label}{props.required && <span className='text-ascents'>*</span>}
          {errors && <span className="text-xs text-danger font-normal ml-3">{errors}</span>}</span>
        <Autocomplete

          disablePortal
          id="cidades"
          options={cities}
          value={data.cidade}
          onChange={(event: any, newValue: string | null) => {
            setData('cidade', newValue);
          }}
          size='small'
          className={`text-xs mt-2 focus:outline-0 rounded-[5px] py-[5.4px] border-[1px] ${errors ? 'border-danger' : 'border-ascents'}`}
          renderInput={(params) => <TextField sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: 'transparent',
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: 'transparent',
            },
            "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: 'transparent',
            },
            "& .MuiInputBase-input": {
              color: '#585858',
              fontSize: '14px',
            },
            "& .MuiInputLabel-root": {
              color: '#979797',
              fontSize: '13px',
            },
          }}

            {...params} label={props.placeholder || ''} />}
        />

      </div>
    </ThemeProvider>
  );
}
export default CityInput