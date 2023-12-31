import React from 'react';
import { TextPropsInterface } from './interfaces/TextProps';


function TextInput({ name, placeholder = `Type the ${name}`, register, errorMessage, defaultValue=""}: TextPropsInterface) {
 
  return (
    <>
      <input
        type="text"
        defaultValue={defaultValue}
        {...register}
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

export { TextInput };
