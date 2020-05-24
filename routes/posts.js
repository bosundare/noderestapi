const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');



router.get('/', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/login', (req, res) => {
    // Mock user
    const user = {
      id: 1, 
      username: 'bosun',
      email: 'bosundare@gmail.com'
    }
  
    jwt.sign({user}, 'secretkey', { expiresIn: '500s' }, (err, token) => {
      res.json({
        token
      });
    });
  });

router.post('/', verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (err, authData)=> {
        if(err) {
            res.sendStatus(403);
        }else {
            const post = new Post({
                title: req.body.title,
                description: req.body.description
            });
        
            post.save()
                .then(data => {
                    res.json(data),
                    authData
                    
                })
                .catch(err => {
                    res.json({ message: err});
                });
        }
    })
    
    
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

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

module.exports = router;