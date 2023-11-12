import React from 'react';
import { LabelPropsInterface } from './interfaces/LabelProps';


function Label({ text, nameField }: LabelPropsInterface) {
  return (
    <label className="block text-sm" htmlFor={nameField}>
      {text}      
    </label>
  );
  
}

export { Label };