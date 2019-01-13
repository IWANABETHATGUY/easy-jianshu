import Notification from 'antd/lib/notification';

export const openNotificationWithIcon = (type, title, message) => {
  Notification[type]({
    message: title,
    description: message,
    duration: 1.5,
  });
};

export function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]; // 结果：   image/png
  const bstr = atob(arr[1].replace(/\s/g, ''));
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime }); //值，类型
}
