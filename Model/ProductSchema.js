const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required:[true,"Description is required"],
  },
  StartDate:{
    type:String,
    required:[true,"StartDate is required"],

},
EndDate:{
  type:String,
  required:[true,"StartDate is required"],
},
  picture:{
    type:String,
    // required:["image is Required"]
  },

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
