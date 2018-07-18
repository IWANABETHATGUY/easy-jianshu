const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

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
    required: true
  },
  lockUntil: {
    type: Number,
    default: 0
  },
  loginAttempts: {
    type: Number,
    default: 0
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

User.virtual('isLocked').get(() => {
  return !!(this.lockUntil && (this.lockUntil > Date.now()));
})

User.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
    this.pseudonym = this.username;
  } else {
    this.meta.updatedAt = Date.now();
  }
  next();
})

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
    })
  })
})

User.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch);
        } else {
          reject(err);
        }
      })
    })
  },
  incLoginAttempts: (user, match) => {
    return new Promise((resolve, reject) => {
      if ((user.lockUntil < Date.now()) && match) {
        let updates = {
          $set: {
            loginAttempts: 1,
            lockUntil: 1
          }
        };

        user.update(updates, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(false);
          }
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        };

        if (user.loginAttempts + 1 >= MAX_ATTEMPT_TIMES) {
          if (!user.isLocked) {
            updates = {
              $set: {
                lockUntil: Date.now() + LOCKED_TIME
              }
            }
          } else {
            resolve(true);
          }
        }
        
        user.update(updates, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(false)
          }
        })
      }
    })
  }
}



module.exports = mongoose.model('User', User, 'users');