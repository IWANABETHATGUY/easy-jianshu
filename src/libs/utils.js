import { notification } from 'antd';

export const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
    duration: 2.5
  });
};