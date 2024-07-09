const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists and serve it statically
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
router.use('/uploads', express.static(uploadDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to create a new post with image upload
router.post('/create', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, summary, content } = req.body;
        const image = req.file ? req.file.filename : null;

        const post = new Post({
            title,
            summary,
            content,
            image,
            author: req.user._id
        });
        await post.save();
        res.status(201).send({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route to fetch posts of the authenticated user
router.get('/user-posts', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id });
        res.status(200).send(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route to delete a post by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.error('Post not found:', req.params.id);
            return res.status(404).send({ message: 'Post not found' });
        }
        if (post.author.toString() !== req.user._id) {
            console.error('Unauthorized attempt to delete post:', req.user._id);
            return res.status(403).send({ message: 'Unauthorized' });
        }

        await Post.deleteOne({ _id: req.params.id });
        res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
