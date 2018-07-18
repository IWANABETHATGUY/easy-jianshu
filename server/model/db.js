const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/jianshu';


exports.connect = () => {
  let maxCount = 0;
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      mongoose.set('debug', true);
    }
  
    mongoose.connect(db, { useNewUrlParser: true });
  
    mongoose.connection.on('disconnected', () => {
      maxCount ++;
      if (maxCount < 5) {
        mongoose.connect(db, { useNewUrlParser: true });
      } else {
        throw new Error('服务器挂了，请维护');
      } 
    })
  
    mongoose.connection.on('error', (err) => {
      maxCount ++;
      if (maxCount < 5) {
        mongoose.connect(db, { useNewUrlParser: true });
      } else {
        throw new Error('服务器挂了，请维护');
      }
    })
  
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully');
      resolve();
    })
  })
  
}