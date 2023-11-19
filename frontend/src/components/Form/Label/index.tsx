import React from 'react';
import { LabelPropsInterface } from './interfaces/LabelProps';

function Label({ text, nameField, required }: LabelPropsInterface) {
  return (
    <label className="block text-sm" htmlFor={nameField}>
      {text} {required && <span className="text-red-500" >*</span>}
    </label>
  );
}

export { Label };
