import React from 'react';
import { LabelPropsInterface } from './interfaces/LabelProps';

function Label({ text, nameField, required }: LabelPropsInterface) {
  return (
    <label className="block text-sm" htmlFor={nameField}>
      {text} {required && <span>*</span>}
    </label>
  );
}

export { Label };
