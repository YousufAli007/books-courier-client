import React, { use, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const PaymentSuccess = () => {
  const [serchParams]=useSearchParams();
  const sessionId = serchParams.get("session_id");
  const axiosSecure=useAxiosSecure()
  console.log(sessionId)
  useEffect(()=>{
    if(sessionId){
      axiosSecure.patch(`/payment-succes?session_id=${sessionId}`)
      .then(res=>{
        console.log(res.data)
      })

    }
  },[sessionId,axiosSecure])
  return (
    <div>
      <h2 className="text-4xl">Paymetn success</h2>
      <Link to="/dashboard/my-orders"><button className='btn btn-primary'>My Order</button></Link>
    </div>
  );
};

export default PaymentSuccess;