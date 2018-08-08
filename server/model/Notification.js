const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const Article = require('./Article');
const User = require('./User');

const Notification = new Schema({
  type: {
    type: String,
    required: true
  },
  contentId: {
    type: String,
    required: true
  },
  // 查找前看看这个Comment是否属于某一个comment，如果属于直接把这个评论加到那个comment的commentList中就好了
  userID: {
    type: ObjectId,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }
});

// const exComment = mongoose.model('Comment', Comment);

Notification.pre('save', async function(next) {
  if (this.isNew) {
    switch(this.type) {
      case 'comment':
        break;
      case 'article': 
        break;
      default:
        break;
    }
    // if (this.replyToC) {
    //   try {
    //     this.underCommentID = this._id;
    //     await Article.update({_id: this.ArticleID}, {
    //       $push: {commentList: this._id},
    //       $inc: {
    //         comment: 1,
    //         ucCount: 1
    //       }
    //     })
    //   } catch (err){
    //     next(err)
    //   }

    // } else {
    //   try {
    //     await exComment.update({_id: this.underCommentID}, {
    //       $push: {replyList: this._id},
    //       $inc: {
    //         replyCount: 1
    //       }
    //     })
    //     await Article.update({_id: this.ArticleID}, {
    //       $inc: {
    //         comment: 1
    //       }
    //     })
    //   } catch (err) {
    //     next(err);
    //   }
    // }
  }
  
  next();
})

Notification.methods = {
  
}

module.exports = mongoose.model('Notification', Notification);