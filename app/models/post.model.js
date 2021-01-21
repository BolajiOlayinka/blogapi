const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
     type: String,
     required: true
    },
    author: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
