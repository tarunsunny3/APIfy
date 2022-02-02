const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    name: String,
    description: [{endpoint: String, desc: String}],
    imageUrl: String
},
{
    timestamps: true
}
);

// export model API with ApiSchema
module.exports = mongoose.model('Api', ApiSchema);
