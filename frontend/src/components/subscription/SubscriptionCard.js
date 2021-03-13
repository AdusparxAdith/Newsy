import React, { useState } from 'react';
import Axios from 'axios';
import load from './loading.gif';

import useNotification from '../hooks/useNotification';

export default function SubscriptionCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [Notification, notify] = useNotification();

  const submit = async () => {
    if (!email)
      return notify({
        type: 'failure',
        message: 'Please enter an email address!',
      });
    try {
      setLoading(true);
      await Axios.post('/api/newsy/', {
        email,
        date: new Date().toISOString(),
      });
      setTimeout(() => setLoading(false), 300);
      notify({ type: 'success', message: "You've been registered!" });
    } catch (error) {
      setTimeout(() => setLoading(false), 300);
      if (error.message.includes(400))
        return notify({
          type: 'failure',
          message: 'Please try another email id',
        });

      notify({
        type: 'failure',
        message: 'Something went wrong! Try again later.',
      });
    }
  };

  return (
    <div className="flex flex-col h-96 w-full max-w-screen-sm md:shadow-xl  text-gray-800 uppercase">
      <div className="h-full flex flex-col justify-center items-center  px-5">
        <p className="text-center text-blue-200">
          <i className="fas fa-envelope-open-text text-7xl "></i>
        </p>
        <h3 className="text-gray-500 text-center font-bold p-2">
          don't miss any update
        </h3>
        <p className="text-gray-400 text-center text-xs">
          sign up with your email to receive latest updates
        </p>
      </div>
      <div className="mt-auto pb-20 px-5">
        <div className="flex justify-center items-center">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none bg-gray-100 p-3 w-80 mb-4 text-center rounded-none"
            placeholder="Enter your email address"
          />
          <div
            onClick={submit}
            className={`flex justify-center items-center bg-gray-100 mb-4 p-4 outline-none rounded-none border-none text-gray-500 cursor-pointer hover:text-gray-700 ${
              loading && 'pointer-events-none'
            }`}
          >
            {loading ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              <i className="fas fa-paper-plane "></i>
            )}
          </div>
        </div>
        <p className="text-gray-300 text-center text-xs">
          don't worry, we won't spam you
        </p>
      </div>
      <Notification />
    </div>
  );
}
