const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const Article = new Schema({
  pseudonym: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
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



Article.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
})


module.exports = mongoose.model('Article', Article);