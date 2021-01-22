const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
     type: String,
     required: true
    },
    author: String,
    subtitle:String,
    article:{
        type:String,
        required:true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
