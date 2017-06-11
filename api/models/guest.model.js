const mongoose = require('mongoose');

const GuestSchema = ({
  firstName: {
    type: String,
    required: [true, 'First name field is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required']
  }
//Add in other properties maybe include a default parameter
});

module.exports = mongoose.model('wedding-project', GuestSchema);
