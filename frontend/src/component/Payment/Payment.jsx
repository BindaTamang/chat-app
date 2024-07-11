import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import Payment from './Payment';
import {PaymentUI} from './PaymentUI';

// Replace with your own publishable key


const Payment = () => {
  const stripePromise = loadStripe('pk_test_pIvwy6D5UU5CYn2zKUwOfCQD001wHpEaAl');
  let amount = 100;
  const options = {
    mode:"payment",
    amount:Math.round(amount * 100),
    currency:"usd"
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentUI />
    </Elements>
  );
};

export default Payment;
