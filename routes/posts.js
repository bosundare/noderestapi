const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/', (req, res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err});
        });
});

//Get a specific post
router.get('/:postId', async (req,res)=>{
        
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
        
    }catch(err){
        res.json({message: err});
    }
});

router.delete('/:postId', async (req, res)=>{
    try {
        const removed = await Post.remove({_id:req.params.postId})
        res.json(removedPost)
    } catch (error) {
        res.json({message: error});
        
    }
    
});


router.patch('/:postId', async (req,res)=>{
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title }}
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
    }
});

module.exports = router;