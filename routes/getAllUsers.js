const express = require("express");
const router = express.Router();

//http://localhost:3000/api/users

module.exports = function(driver) {
  router.get('/users', async (req, res) => {
      const session = driver.session();
      try {
        const result = await session.run('MATCH (u:User) RETURN u');
        const users = result.records.map(record => record.get('u').properties);
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving users');
      } finally {
        await session.close();
      }
    });

  return router;
};
