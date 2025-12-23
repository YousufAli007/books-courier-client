import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageBook = () => {
  const axiosSecure =useAxiosSecure()
  const {data:books =[]}=useQuery({
    queryKey:['books'],
    queryFn:async ()=>{
      const res =await axiosSecure.get('/books')
      return res.data
    }
  })
  console.log(books)
  return (
    <div>
      
    </div>
  );
};

export default ManageBook;