const express = require("express");
const router = express.Router();

//http://localhost:3000/api/platform

module.exports = function(driver) {
  router.get('/platform', async (req, res) => {
      const session = driver.session();
      try {
        const result = await session.run('MATCH (u:Platform) RETURN u');
        const platform = result.records.map(record => record.get('u').properties);
        res.json(platform);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving platform');
      } finally {
        await session.close();
      }
    });

  return router;
};
