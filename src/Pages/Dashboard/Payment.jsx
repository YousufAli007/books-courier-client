import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Loading from '../../Components/Loading';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure =useAxiosSecure()
  const {isLoading, data:book={}}=useQuery({
    queryKey:['orders', parcelId],
    queryFn:async ()=>{
      const res =await axiosSecure.get(`/order/${parcelId}`);
      return res.data
    }
  })
  // console.log(book);
 const handlePayment = async () => {
   const paymentInfo = {
     cost: book.price,
     parcelId: book._id,
     bookName: book.bookName,
     email: book.buyerEmail,
   };

   const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
   window.location.href = res.data.url;
 };

  return (
    <div>
      <h1>
        place pay {book.price} taka for {book.bookName} book
      </h1>
      <button onClick={handlePayment} className="btn btn-primary">
        {" "}
        pay
      </button>
    </div>
  );
};

export default Payment;