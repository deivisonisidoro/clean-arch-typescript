"use client"
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

import Table from '@/components/Table';
import { getAllUsers } from '@/services/users';
import { usersColumns } from './usersColumns';
import Loading from '@/components/Loading';

const Home: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers(currentPage);
        console.log(response);
        
        setUsers(response.body);
        setTotalPages(response.last_page);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally{
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!user ? (
        <Loading size="lg" />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">Hello, {user?.name}!</h1>
          <Table
            isLoading={isLoading}
            data={users}
            columns={usersColumns}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
