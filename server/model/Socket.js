const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Socket = new Schema({
  // 查找前看看这个Comment是否属于某一个comment，如果属于直接把这个评论加到那个comment的commentList中就好了
  userID: {
    type: ObjectId,
    required: true
  },
  socketID: {
    type: String,
    required: true
  }
});
// const exComment = mongoose.model('Comment', Comment);


module.exports = mongoose.model('Socket', Socket);