const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestbookSchema = Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }

});

const GuestbookPosts = mongoose.model('Guestbook', GuestbookSchema);
module.exports = GuestbookPosts;
