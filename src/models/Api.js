const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    endpoints: [{ endpoint: String, description: String, methodType: String }],
    imageUrl: String,

    userID: mongoose.Types.ObjectId
  },
  {
    timestamps: true,
  },
);

// export model API with ApiSchema
module.exports = mongoose.model('Api', ApiSchema);
