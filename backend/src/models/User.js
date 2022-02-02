const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  apis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Api"
  }]
},{timestamps: true});

// export model user with UserSchema
module.exports = mongoose.model('user', UserSchema);
