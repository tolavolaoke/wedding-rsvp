var Post = require('../models/guestbook.model');

function createPost(req, res) {
  Post.create(req.body, function (err) {
    if(err) {
      return res.json(err, 'could not retrive this post');
    } else {
      return res.status(200).json({Post});
    }
  });
}

function getAllPost(req, res) {
  Post.find(function(err, posts) {
    if(err) {
      return res.json(err, 'could not retrive all posts');
    } else {
      return res.status(200).json(posts);
    }
  });
}


module.exports = {
  createPost: createPost,
  getAllPost: getAllPost
};
