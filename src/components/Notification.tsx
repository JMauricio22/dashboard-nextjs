import React, { Fragment } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import { Notification as INotification } from '@hooks/useNotification';

type NotificationProps = {
  notification: INotification;
  closeNotification();
};

export default function Notification({
  notification,
  closeNotification,
}: NotificationProps) {
  const { Icon } = notification;

  return (
    <Transition
      as={Fragment}
      show={notification.open}
      enter="transition-transform duration-150"
      enterFrom="translate-x-40 opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed w-80 h-auto px-2 py-4 rounded-md bg-white right-4 top-8 shadow-md z-10">
        <div className="pl-8 relative flex items-center">
          {Icon && (
            <Icon
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5`}
            />
          )}
          <span className="font-bold text-sm -mt-1">{notification.title}</span>
          <XIcon
            className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:cursor-pointer"
            onClick={closeNotification}
          />
        </div>
        <div className="pl-8">
          <span className="font-small text-sm text-gray-500">
            {notification.message}
          </span>
        </div>
      </div>
    </Transition>
  );
}
