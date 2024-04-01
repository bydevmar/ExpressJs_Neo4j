const express = require('express');
const neo4j = require('neo4j-driver');
const app = express();

// Configure Neo4j connection details
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password"));

// Import routes
const usersRoutes = require('./routes/getAllUsers')(driver);
const platformRoutes = require('./routes/getAllPlatforms')(driver);
const postRoutes = require('./routes/getAllPosts')(driver);

app.use('/api', [usersRoutes , platformRoutes , postRoutes]);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
