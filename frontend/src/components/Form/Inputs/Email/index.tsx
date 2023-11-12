import React from 'react';
import { EmailPropsInterface } from './interfaces/EmailProps';

function EmailInput({ name, placeholder = `Type the ${name}`, register, errorMessage, defaultValue=""}: EmailPropsInterface) {

  
  return (
    <>
      <input 
        {...register}
        type='email'
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          !!errorMessage ? 'border-red-500 placeholder-red-500' : ''
        }`}
      />
      {!!errorMessage && (
        <div className="flex items-center gap-1">
          <span className="text-red-500 text-sm font-medium">{errorMessage}</span>
        </div>
      )}
    </>
  );
  
}

export { EmailInput };