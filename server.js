const express = require('express');
const { v1: neo4j } = require('neo4j-driver');

const app = express();
const port = 3000;


// Neo4j driver setup
const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'password')
);

// Middleware to parse JSON requests
app.use(express.json());

// Example routes
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
