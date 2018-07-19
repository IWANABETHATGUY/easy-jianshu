const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Article = require('./Article');


const Comment = new Schema({
  pseudonym: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0,
  },
  replyList: [ObjectId],
  ArticleID: {
    type: ObjectId,
    required: true
  },
  replyToC: {
    type: Boolean,
    required: true
  },
  underCommentID: {
    type: ObjectId,
    default: null
  },
  // 查找前看看这个Comment是否属于某一个comment，如果属于直接把这个评论加到那个comment的commentList中就好了
  CommentID: {
    type: ObjectId,
    default: null
  },
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

const exComment = mongoose.model('Comment', Comment);

Comment.pre('save', async function(next) {
  if (this.isNew) {
    this.meta.createdAt = Date.now();
    this.replyList = [];
    if (!this.replyToC) {
      try {
        this.underCommentID = this._id;
        await Article.update({_id: this.ArticleID}, {
          $push: {commentList: this._id},
          $inc: {
            comment: 1,
            ucCount: 1
          }
        })
      } catch (err){
        next(err)
      }

    } else {
      try {
        await exComment.update({_id: this.underCommentID}, {
          $push: {replyList: this._id},
          $inc: {
            replyCount: 1
          }
        })
        await Article.update({_id: this.ArticleID}, {
          $inc: {
            comment: 1
          }
        })
      } catch (err) {
        next(err);
      }
    }
  }
  
  next();
})

Comment.pre('remove', async function(next) {
  if (this.replyToC) {
    await exComment.update({_id: this.underCommentID}, {
      $inc: {
        replyCount: -1
      },
      $pull: {
        replyList: this._id
      }
    })
    await Article.update({_id: this.ArticleID}, {
      $inc: {
        comment: -1
      },
    })
  }
  await next();
})

module.exports = exComment;