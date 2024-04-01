const express = require("express");
const router = express.Router();

module.exports = function(driver) {
  // Route to create a new user
  router.post('/user', async (req, res) => {
    const session = driver.session();
    //const { name, age } = req.body;
    const name = "nordin gajja";
    const age = 23;
    try {
      const result = await session.run('CREATE (u:User {name: $name, age: $age}) RETURN u', { name, age });
      const newUser = result.records[0].get('u').properties;
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    } finally {
      await session.close();
    }
  });

  return router;
};
