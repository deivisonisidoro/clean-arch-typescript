import React from 'react';
import { FormValues } from '../interfaces/FormValues ';
import { UseControllerProps, useController } from 'react-hook-form';


function PasswordInput(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props);
  return (
      <>
        <input
          type='password'
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...field}
          placeholder={`Type the ${props.name}`} 
          />
          <p>{fieldState.isTouched && "Touched"}</p>
          <p>{fieldState.isDirty && "Dirty"}</p>
          <p>{fieldState.invalid ? "invalid" : "valid"}</p>
      </>
  );
  
}

export { PasswordInput };