import Notification from 'antd/lib/notification';

export const openNotificationWithIcon = (type, title, message) => {
  Notification[type]({
    message: title,
    description: message,
    duration: 1.5
  });
};