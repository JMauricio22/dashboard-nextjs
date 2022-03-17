import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';

export enum NotificationsIcons {
  success = 'success',
  error = 'error',
}

const icons = {
  [NotificationsIcons.success]: (props) => (
    <CheckCircleIcon
      {...props}
      className={clsx(props.className, 'text-green-400')}
    />
  ),
  [NotificationsIcons.error]: (props) => (
    <ExclamationCircleIcon
      {...props}
      className={clsx(props.className, 'text-red-400')}
    />
  ),
};

export interface Notification {
  open: boolean;
  title: string;
  message: string;
  Icon: React.FC<any> | null;
  duration: number;
}

const defaultState = {
  open: false,
  title: '',
  message: '',
  Icon: null,
  duration: 3000,
};

export default function useNotification() {
  const [notification, setNotification] = useState<Notification>(defaultState);

  const showNotification = (
    title: string,
    message: string,
    iconType?: NotificationsIcons,
    duration?: number
  ) => {
    iconType = iconType || NotificationsIcons.success;
    duration = duration || 3000;

    setNotification({
      open: true,
      title,
      message,
      Icon: icons[iconType],
      duration,
    });
  };

  const closeNotification = () => {
    setNotification(defaultState);
  };

  useEffect(() => {
    if (notification.open) {
      setTimeout(() => {
        closeNotification();
      }, notification.duration);
    }
  }, [notification]);

  return {
    notification,
    showNotification,
    closeNotification,
  };
}
