import LinkComponent from '@/components/Link';
import React from 'react';


const Unauthenticated: React.FC = () => {
  return (
     <div className="flex items-center justify-center h-screen">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">Unauthenticated Page</h1>
        <p className="mt-4 text-lg">This is a page for users without authentication.</p>
        <LinkComponent route="/" label="Go back to Sign In" color='purple'/>
      </div>
    </div>
  );
}

export default Unauthenticated;