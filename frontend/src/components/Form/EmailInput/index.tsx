import React from 'react';
import { EmailInputPropsInterface } from './EmailInputPropsInterface';


function EmailInput({ name, placeholder= "Type here" }: EmailInputPropsInterface) {
  return (
      <input 
        id={name} 
        type="email" 
        name={name} 
        placeholder={placeholder} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
  );
  
}

export { EmailInput };