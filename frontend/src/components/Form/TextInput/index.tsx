import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import { FormValues } from '../interfaces/FormValues ';


function TextInput(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);
  return (
      <>
        <input 
        type="text" 
        {...field}
        placeholder={`Type the ${props.name}`} 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
        <p>{fieldState.isTouched && "Touched"}</p>
        <p>{fieldState.isDirty && "Dirty"}</p>
        <p>{fieldState.invalid ? "invalid" : "valid"}</p>
      </>
  );
  
}

export { TextInput };