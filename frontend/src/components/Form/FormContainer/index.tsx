import React from 'react';
import { FormContainerPropsInterface } from './FormContainerPropsInterface';


function FormContainer ({ children }: FormContainerPropsInterface) {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {children}
    </form>
  );
}

export { FormContainer };