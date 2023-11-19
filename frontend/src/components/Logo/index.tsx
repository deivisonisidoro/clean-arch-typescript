import Image from 'next/image';
import React from 'react';
import { LogoProps } from './@types/LogoProps';


function Logo ({width = 150, height = 150}: LogoProps){
  return (
    <Image
      src="/Logo.jpg"
      alt="Logo"
      className="max-w-full rounded"
      width={width}
      height={height}
    />
  );
}

export default Logo;