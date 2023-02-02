/* eslint-disable react/display-name */
import React from 'react';
import {
  MessageOptions,
  showMessage as showFlashMessage,
} from 'react-native-flash-message';
import {
  NotificationAlert,
  NotificationAlertProps,
  NotificationAlertType,
} from './notification-alert.component';

const AUTO_HIDE_DURATION = 2000;
export const showMessage = (
  flashMessage = '',
  props = {},
  type?: NotificationAlertType,
  notificationAlertProps?: Partial<NotificationAlertProps>,
): void => {
  const message: Partial<MessageOptions & {renderCustomContent: any}> = {
    message: '',
    backgroundColor: 'transparent',
    duration: AUTO_HIDE_DURATION,
    animated: false,
    position: 'bottom',
    type: 'none',
    renderCustomContent: () => (
      <NotificationAlert
        type={type}
        message={flashMessage}
        {...notificationAlertProps}
      />
    ),
    ...props,
  };

  showFlashMessage(message as MessageOptions);
};
