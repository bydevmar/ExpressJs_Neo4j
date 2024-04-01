const express = require('express');
const neo4j = require('neo4j-driver');
const app = express();

// Configure Neo4j connection details
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password"));

// Import routes
const getUsersRoutes = require('./routes/getAllUsers')(driver);
const getPlatformRoutes = require('./routes/getAllPlatforms')(driver);
const getPostRoutes = require('./routes/getAllPosts')(driver);

//create nodes
const postUsersRoutes = require('./routes/CreateUser')(driver);
const postPostsRoutes = require('./routes/CreatePost')(driver);
const postPlatformsRoutes = require('./routes/CreatePlatform')(driver);

app.use('/api', [getUsersRoutes , getPlatformRoutes , getPostRoutes ,
                postUsersRoutes , postPostsRoutes , postPlatformsRoutes


]);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
