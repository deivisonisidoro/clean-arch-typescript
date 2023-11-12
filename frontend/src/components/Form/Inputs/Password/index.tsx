import React from 'react';
import { useController } from 'react-hook-form';
import { PasswordPropsInterface } from './interfaces/PasswordProps';


function PasswordInput({ name, placeholder= `Type the ${name}`}: PasswordPropsInterface) {
  const { field, fieldState } = useController({name});
  return (
      <>
        <input
          type='password'
          {...field}
          placeholder={placeholder} 
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !!fieldState.error ? 'border-red-500 placeholder-red-500' : ''
          }`}
          />
          {!!fieldState.error && (
            <div className="flex items-center gap-1">
              <span className="text-red-500 text-sm font-medium">{fieldState.error.message}</span>
            </div>
          )}
      </>
  );
  
}

export { PasswordInput };