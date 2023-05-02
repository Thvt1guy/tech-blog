const router = require('express').Router();
const { response } = require('express');
const {Post, User, Comment} = require('../models/');


// get all posts for homepage

router.get('/', async (req, res) => {
    try {
        // res.status(200).json("Homepage Route Working!")
        const postData = await Post.findAll({include: [{ all: true }]});

        const post = postData.map((post)=> post.get({ plain: true }));

        res.render('homepage', { post, logged_in: req.session.logged_in });
        // res.render('homepage', { post, user_id: req.session.user_id, logged_in: req.session.logged_in});
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
    // res.render('login');
    // res.status(200).json("Login Route Working!")
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup', {logged_in: req.session.logged_in});
    // res.status(200).json("Signup Route Working!")
});

router.get('/post/:id', async (req, res) => {
    try {
        // res.status(200).json("Homepage Route Working!")
        const postData = await Post.findByPk(req.params.id);

        // console.log(postData);

        if(!postData){
            alert("NO POST FOUND!");
            res.status(404).end();
            res.redirect('/');
        } else {
            const post = postData.get({ plain: true })
            res.render('singlepost', { post });
        }
        // res.render('homepage', { post, user_id: req.session.user_id, logged_in: req.session.logged_in});
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;