import React from 'react';
import { PasswordInputPropsInterface } from './PasswordInputPropsInterface';


function PasswordInput({ name, placeholder= "Type here" }: PasswordInputPropsInterface) {
  return (
      <input 
        id={name} 
        type="password" 
        name={name} 
        placeholder={placeholder} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      />
  );
  
}

export { PasswordInput };