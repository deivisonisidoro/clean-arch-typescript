import React from 'react';
import { FormContainerPropsInterface } from './FormContainerPropsInterface';


function FormContainer ({ children, onSubmit }: FormContainerPropsInterface) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-xs px-8 pt-6 pb-8 mb-4">
      {children}
    </form>
  );
}

export { FormContainer };