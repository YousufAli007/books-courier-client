import React from 'react';
import { Link } from 'react-router';

const PaymentCencel = () => {
  return (
    <div>
      <h2 className="text-3xl">Payment Cencle</h2>
      <Link to="/dashboard/my-orders"><button className='btn btn-primary'>Try Again</button></Link>
    </div>
  );
};

export default PaymentCencel;