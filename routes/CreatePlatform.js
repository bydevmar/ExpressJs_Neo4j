const express = require("express");
const router = express.Router();

module.exports = function(driver) {
  // Route to create a new platform
  router.post('/platform', async (req, res) => {
    const session = driver.session();
    const  name  = "LinkedIn"; //req.body;
    try {
      const result = await session.run('CREATE (p:Platform {name: $name}) RETURN p', { name });
      const newPlatform = result.records[0].get('p').properties;
      res.json(newPlatform);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating platform');
    } finally {
      await session.close();
    }
  });

  return router;
};
