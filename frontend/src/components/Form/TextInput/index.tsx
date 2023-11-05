import React from 'react';
import { TextInputPropsInterface } from './TextInputPropsInterface';


function TextInput({ name, placeholder= "Type here" }: TextInputPropsInterface) {
  return (
      <input 
        id={name} 
        type="text" 
        name={name} 
        placeholder={placeholder} 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
  );
  
}

export { TextInput };