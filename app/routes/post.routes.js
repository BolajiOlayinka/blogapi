module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    // Create a new post
    app.post('/posts', posts.create);

    // Get all posts
    app.get('/posts', posts.getAll);

    // Get a single post with postId
    app.get('/posts/:postId', posts.getById);

    // Update a post with postId
    app.put('/posts/:postId', posts.update);

    // Delete a post with postId
    app.delete('/posts/:postId', posts.delete);
}
