const router = require('express').Router();
// const { response } = require('express');
const {Post} = require('../models/');

// get all posts for homepage

router.get('/', async (req, res) => {
    try {
        // res.status(200).json("Homepage Route Working!")
        const postData = await Post.findAll();

        const post = postData.map((post)=> post.get({ plain: true }));

        res.render('homepage', { post, user_id: req.session.user_id, logged_in: req.session.logged_in});
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;