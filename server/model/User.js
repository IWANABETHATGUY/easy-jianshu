const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// TODO: 记得最后一次迭代把那些test接口全部去掉
const SALT_WORK_FACTOR = 10;
const MAX_ATTEMPT_TIMES = 5;
const LOCKED_TIME = 2 * 60 * 60 * 1000;

const User = new Schema({
  username: {
    type: String,
    unique: true,
  },
  pseudonym: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'http://jianshuavatar.flatpeach.xyz/avatar-default.png',
  },
  checkedNotifications: { type: Array },
  unCheckedNotifications: { type: Array },
  followList: [ObjectId],
  followerList: [ObjectId],
  lockUntil: {
    type: Number,
    default: 0,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
});

// const expUser = mongoose.model('User', User, 'users');

User.virtual('isLocked').get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

User.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
    this.pseudonym = this.username;
    this.checkedNotifications = this.unCheckedNotifications = [];
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
});

User.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err1, salt) => {
    if (err1) return next(err1);

    bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err2) return next(err2);
      this.password = hash;
      next();
    });
  });
});

User.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      });
    });
  },
  incLoginAttempts: (user, match) => {
    return new Promise((resolve, reject) => {
      if (user.lockUntil < Date.now() && match) {
        let updates = {
          $set: {
            loginAttempts: 1,
            lockUntil: 1,
          },
        };

        user.update(updates, err => {
          if (err) {
            reject(err);
          } else {
            resolve(false);
          }
        });
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1,
          },
        };

        if (user.loginAttempts + 1 > MAX_ATTEMPT_TIMES) {
          if (!user.isLocked) {
            updates = {
              $set: {
                lockUntil: Date.now() + LOCKED_TIME,
              },
            };
          } else {
            resolve(true);
          }
        }

        user.update(updates, err => {
          if (err) {
            reject(err);
          } else {
            resolve(false);
          }
        });
      }
    });
  },
};

User.statics.isFollowed = async (author, followerid) => {
  return new Promise((resolve, reject) => {
    resolve(author.followerList.filter(item => item === followerid).length > 0);
  });
};

module.exports = mongoose.model('User', User, 'users');
