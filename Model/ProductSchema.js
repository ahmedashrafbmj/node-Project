const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  picture:{
    type:String,
    // required:["image is Required"]
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
