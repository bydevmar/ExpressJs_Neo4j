const express = require("express");
const router = express.Router();

//http://localhost:3000/api/post

module.exports = function(driver) {
  router.get('/post', async (req, res) => {
      const session = driver.session();
      try {
        const result = await session.run('MATCH (u:Post) RETURN u');
        const post = result.records.map(record => record.get('u').properties);
        res.json(post);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving post');
      } finally {
        await session.close();
      }
    });

  return router;
};
