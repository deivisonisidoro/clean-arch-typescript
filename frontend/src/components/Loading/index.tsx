import React from 'react';
import { LoadingProps } from './@types/LoadingProps';
import LoadingIcon from './LoadingIcon';


function Loading ({ size= "md" }: LoadingProps) {
  return (
    <div role="status">
        <LoadingIcon  size={size}/>
        <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading; 