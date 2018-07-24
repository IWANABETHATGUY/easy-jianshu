const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Notification = require('./Notification');
const User = require('./User');

const Article = new Schema({
  pseudonym: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  commentList: [ObjectId],
  likeList: [ObjectId],
  summary: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: []
  },
  like: {
    type: Number,
    default: 0
  },
  comment: {
    type: Number,
    default: 0,
  },
  ucCount: {
    type: Number,
    default: 0
  },
  picUrl: {
    type: String,
    default: ''
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});



Article.pre('save', async function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
    this.commentList = this.likeList = [];
    let resNotification = await Notification.create({
      type: 'article',
      contentId: this._id,
      userID: this.userID
    })
    const notificationId = resNotification._id;
    const author = await User.findOne({_id: this.userID});
    author.followerList.forEach(async (id) => {
      await User.update({_id: id}, {
        $push: {
          unCheckedNotifications: {
            type: 'article',
            id: notificationId
          }
        }
      })
    })
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
})


module.exports = mongoose.model('Article', Article);