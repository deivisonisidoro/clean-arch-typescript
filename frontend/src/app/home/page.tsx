"use client"
import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      {!user ? <h1>User not found</h1> : <h1>{user?.name}</h1>}
    </>
  );
}

export default Home;

