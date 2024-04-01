const express = require("express");
const router = express.Router();

module.exports = function(driver) {
  // Route to create a new post
  router.post('/post', async (req, res) => {
    const session = driver.session();
    const content  = "hello world from bydevmar"; //req.body;
    try {
      const result = await session.run('CREATE (p:Post {content: $content}) RETURN p', { content });
      const newPost = result.records[0].get('p').properties;
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating post');
    } finally {
      await session.close();
    }
  });

  return router;
};
