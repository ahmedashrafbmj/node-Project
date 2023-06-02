const Post = require("../Model/ProductSchema")
const { upload } = require("../MiddelWare/Multer");

// Subadmin add post route
const AddProduct = async (req, res) => {
  try {
    console.log( req.file.filename )
    // upload(req, res, async function (err) {
    //   if (err) {
    //     // Handle multer error
    //     return res.status(500).json({ message: 'Multer error', error: err.message });
    //   }

      const { title, content, stock } = req.body;
      const { userId } = req.user; // Assuming you have authenticated the subadmin user
      
      const post = new Post({
        title,
        content,
        stock,
        author: userId,
        picture: req.file.filename // Access the uploaded file using req.file
      });

      await post.save();

      console.log(title);
      console.log(post, "post");

      res.status(201).json({ message: 'Post added successfully and pending admin approval' });
    // });
  } catch (error) {
    console.log(req, "req.user");
    res.status(500).json({ message: 'Failed to add post', error: error.message });
  }
};

// Admin approve post route
const ApprovePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log(req.body.action)
    const action = req.body.action;
    console.log(req.params.postId, " req.params.postId")

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (action === 1) {
      post.isApproved = true;
      res.json({ message: 'Post approved successfully' });
    }
    else if (action === 0) {
      post.isApproved = false;
      res.json({ message: 'Post rejected successfully' });
    }
    else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await post.save();

  } catch (error) {
    res.status(500).json({ message: 'Failed to approve post', error: error.message });
  }
};


const GetAllApprovedPostAdmin = async (req, res) => {
  try {
    const action = req.body.action;
    if (action === 1) {
      const posts = await Post.find({ isApproved: true }).populate('author');
      res.json({ posts });
    }
    else if (action === 0) {
      const posts = await Post.find({ isApproved: false }).populate('author');
      res.json({ posts });
    }
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to retrieve approved or reject posts', error: error.message });
  }
}
const GetAllApprovedPost = async (req, res) => {
  try {

    const posts = await Post.find({ isApproved: true }).populate('author');
    res.json({ posts });

  }
  catch (error) {
    res.status(500).json({ message: 'Failed to retrieve approved or reject posts', error: error.message });
  }
}




module.exports = {
  AddProduct,
  ApprovePost,
  GetAllApprovedPost,
  GetAllApprovedPostAdmin
}




