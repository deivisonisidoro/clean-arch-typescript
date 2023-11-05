import React from 'react';
import { LabelPropsInterface } from './LabelPropsInterface';


function Label({ text, nameField }: LabelPropsInterface) {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={nameField}>
      {text}      
    </label>
  );
  
}

export { Label };