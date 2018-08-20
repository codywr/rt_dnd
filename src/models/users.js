
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//
// Connect to the MongoDB
// TODO: This works in testing but not sure this is 'right'
const dbUrl = 'mongodb://localhost:27017';
mongoose.connect(dbUrl);
mongoose.connection.once('open', () => {
  console.log('Mongoose eating Mongo');
});

//
// Schema to hold user auth (unique username and password)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // TODO: Second password check?
  // TODO: E-mail recovery?
});

//
// Check for username in DB and then verify a matching password
userSchema.statics.authenticate = function (username, password, callback) {
  users.findOne({ username }).exec((err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      const error = new Error('User not found.');
      error.status = 401;
      return callback(error);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return callback(null, user);
      }
      return callback();
    });
  });
};

//
// Hash the password before writing to the DB
// TODO: Salt the password too
userSchema.pre('save', function (next) { // TODO: Meaning of 'this' changes when using => notation
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const users = mongoose.model('User', userSchema);
module.exports = users;
