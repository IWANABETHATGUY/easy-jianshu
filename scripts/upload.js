const qiniu = require("qiniu");
const fs = require('fs');
const path = require('path');
//需要填写你的 Access Key 和 Secret Key
const { cdn } = require('../app.config');
//要上传的空间
//上传到七牛后保存的文件名
const mac = new qiniu.auth.digest.Mac(cdn.ak, cdn.sk);
//构建上传策略函数
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

const doUpload = (key, file) => {
  const options = {
    scope: cdn.bucket + ':' + key
  };
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  const PutPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = PutPolicy.uploadToken(mac);
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err);
      }
      if (info.statusCode === 200) {
        resolve(body);
      } else {
        reject(info);
      }
    })
  })
}
//调用uploadFile上传

const scripts = fs.readdirSync(path.join(__dirname, '../build/static/js'));
const styles = fs.readdirSync(path.join(__dirname, '../build/static/css'));

const uploadJS = scripts.map(file => {
  return doUpload('static/js/' + file, path.join(__dirname, '../build/static/js', file));
});

const uploadCSS = styles.map(file => {
  return doUpload('static/css/' + file, path.join(__dirname, '../build/static/css', file));
});
Promise.all([...uploadCSS, ...uploadJS])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })