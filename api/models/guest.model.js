const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = ({
  firstName: {
    type: String,
    required: [true, 'First name field is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required']
  },
  extraGuests: {
    type: Number,
    required: [true, 'This field is required']
  },
  attendingEvents: {
    type: String,
    required: [true, 'This field is required']
  },
  comments: {
    type: String,
    required: false
  }
});

const weddingGuests = mongoose.model('Guests', GuestSchema);
module.exports = weddingGuests;
