//this code is to fix later


const express = require("express");
const router = express.Router();

module.exports = function(driver) {
  // Route to create a relationship between a User, a Platform, and a Post
  router.post('/relationship', async (req, res) => {
    const session = driver.session();
    // Assigning values to variables
    const userId = "0";
    const platformId = "8";
    const postId = "9";
    try {
      // Create relationships between User, Platform, and Post
      const result = await session.run(`
        MATCH (u:User {id: $userId})
        MATCH (p:Platform {id: $platformId})
        MATCH (post:Post {id: $postId})
        CREATE (u)-[:POSTED]->(post)
        CREATE (u)-[:USES]->(p);
      `, { userId, platformId, postId });

      res.json({ message: 'Relationship created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating relationship');
    } finally {
      await session.close();
    }
  });

  return router;
};
