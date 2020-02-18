const express = require("express");
const Comment = require("../models/comment");

const router = express.Router();

router.post("", (req, res, next) =>{
  const comment = new Comment({
    title: req.body.title,
    content: req.body.content
  });
  comment.save().then(createComment =>{
    res.status(201).json({
      message: 'Post added successfully',
     commentId: createComment._id
  });
  });

});

router.put("/:id", (req, res, next) =>{
  const comment = new Comment({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Comment.updateOne({_id: req.params.id}, comment).then(result =>{

    res.status(200).json({message: "Update successful"});
  })
});


router.get('',(req,res,next) =>{
  Comment.find()
  .then(documents =>{
    res.status(200).json({
      message: 'Comments fetched succesffully!',
      comments: documents
    });
  });

});

router.get("/:id", (req, res, next) =>{
  Comment.findById(req.params.id).then(comment => {
    if(comment){
      res.status(200).json(comment);
    } else{
      res.status(404).json({message: 'Comment not found!!!'});
    }
  });
});

router.delete("/:id", (req, res, next) =>{

  Comment.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message: 'Comment deleteddd!"'});

  });
});

module.exports = router;
