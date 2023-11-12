import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValuesInterface } from '../interfaces/FormValues';



function EmailInput(props: UseControllerProps<FormValuesInterface> ) {
  const { field, fieldState } = useController(props);
  return (
    <>
      <input 
        {...field}
        type='email'
        placeholder={`Type the ${props.name}`}
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

export { EmailInput };