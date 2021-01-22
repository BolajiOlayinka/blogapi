// const express = require('express');
const Post= require('../models/post.model.js');

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request because in model we required the title
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter post title."
        });
    }
    
    Post.find({title:req.body.title})
    .exec()
    .then(newpost=>{
        if (newpost.length >=1){
            return res.status(409).json({
                message:'Post Already Exist'
            });
        }else{
// Create a post
const post = new Post({
    title: req.body.title,
    subtitle:req.body.subtitle,
    article:req.body.article,
    author: req.body.author || 'Bolaji Olayinka'
});
 // Save Posts
 post.save()
 .then(newpost => {
     res.send(newpost);
 }).catch(err => {
 res.status(500).send({
     message: err.message || "Some error occurred while creating the post."
 });
});
        }
    })
    
   
};

// Get all and return all posts.
exports.getAll = (req, res) => {
    Post.find()
        .then(newpost => {
            // console.log(req)
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex =page * limit
    const result= newpost.slice(startIndex,endIndex)
    if (!page){
        res.send(newpost);
    }else{
        res.send(result);
        console.log(result)
    }
           
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the post."
        });
    });
};

// Get a single post with a bookId
exports.getById = (req, res) => {
    Post.findById(req.params.postId)
        .then(newpost => {
            if(newpost) {
                res.send(newpost);
            }
            return res.status(404).send({
                message: "Post does not exist with id " + req.params.postId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post does not exist with id " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while retrieving the post with postId " + req.params.postId
        });
    });
};

// Update a book by the bookId
exports.update = (req, res) => {
    // Validate Request because title is required
    if(!req.body.title) {
        return res.status(400).send({
            message: "Please enter post title."
        });
    }

    // Find book and update it
    Post.updateOne(req.params.postId, {
        title: req.body.title,
    subtitle:req.body.subtitle,
    article:req.body.article,
    author: req.body.author || 'Bolaji Olayinka'

    }, {new: true})
        .then(newpost => {
            if(newpost) {
                res.send(post);
            }
            return res.status(404).send({
                message: "Post does not exist with postId " + req.params.postId
            });

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post does not exist with postId " + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while updating the post with postId" + req.params.postId
        });
    });
};

// Delete the Book with the bookId
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
        .then(newpost => {
            if(newpost) {
                res.send({message: "Post has been deleted successfully!"});
            }
            return res.status(404).send({
                message: "Post not exist with bookId" + req.params.postId
            });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not exist with bookId" + req.params.postId
            });
        }
        return res.status(500).send({
            message: "Some error occurred while deleting the book with bookId" + req.params.postId
        });
    });
};
