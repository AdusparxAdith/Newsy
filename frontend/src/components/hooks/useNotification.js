import React, { useState } from 'react';

export default function useNotification() {
  const [notifications, setNotifications] = useState([]);

  const colorMap = {
    success: 'bg-green-400',
    failure: 'bg-red-600',
    warning: 'bg-yellow-300 ',
  };

  const resolveColor = (type) => {
    return colorMap[type] || 'bg-green-400';
  };

  const notify = (notification) => {
    notification.color = resolveColor(notification.type);
    notification.id = notifications.length + 1;
    setNotifications([...notifications, notification]);
    notificationTimeout(notification.id);
  };

  const notificationTimeout = (id) => {
    // CLEARS OLDEST NOTIFICATION FIRST
    setTimeout(() => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== id)
      );
    }, 1000);
  };

  const Notification = () =>
    notifications &&
    notifications.map((notification, index) => (
      <div
        className={`w-full fixed px-5 py-3 shadow-md text-center top-${
          index * 12
        } left-0 text-white cursor-default ${notification.color}`}
      >
        {notification.message}
      </div>
    ));
  return [Notification, notify];
}
