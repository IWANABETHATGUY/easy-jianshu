const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Article = require('./Article');
const Notification = require('./Notification');
const User = require('./User');

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
        // 如果该评论是回复某篇文章的，他的underCommentID也就是他所属直接属于某篇文章的评论
        this.underCommentID = this._id;
        const resArticle = await Article.findById(this.ArticleID);
        await resArticle.update({
          $push: {commentList: this._id},
          $inc: {
            comment: 1,
            ucCount: 1
          }
        })
        let resNotification = await Notification.create({
          type: 'acomment',
          contentId: this._id,
          userID: this.userID
        });
        await User.update({_id: resArticle.userID}, {
          $push: {
            unCheckedNotifications: {
              type: 'acomment',
              id: resNotification._id
            }
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
        let resNotification = await Notification.create({
          type: 'ccomment',
          contentId: this._id,
          userID: this.userID
        });
        let replyUser = await exComment.findById(this.CommentID);
        console.log(replyUser.userID);
        await User.update({_id: replyUser.userID}, {
          $push: {
            unCheckedNotifications: {
              type: 'ccomment',
              id: resNotification._id
            }
          }
        })

      } catch (err) {
        next(err);
      }
    }
  }
  await next();
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
  } else {
    await Article.update({_id: this.ArticleID}, {
      $inc: {
        comment: -(this.replyCount + 1),
        ucCount: -1
      },
      $pull: {
        commentList: this._id
      }
    })
    exComment.deleteMany({underCommentID: this._id});
    exComment.deleteOne({_id: this._id});
  }
  await next();
})

module.exports = exComment;