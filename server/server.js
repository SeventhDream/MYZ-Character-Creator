require('dotenv').config(); // Import environmental variables needed for running the development server

const express = require('express'); // Import Express framework
const path = require('path');
const server = express();
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection
const AuthRoute = require('./routes/Auth')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // Connect Mongoose to the database URL
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to the database!')); // Confirm successful connection by printing to the console

// Create a server that runs on Express and can parse JSON and use CORS
server.use(express.json());
server.use(cors());
server.use(express.static(path.resolve(__dirname, '..', 'client', 'src', 'images')));
// Route for handling '/characters' HTTP endpoint
const router = require('./routes/characters');
server.use('/characters', router);
server.use('/api', AuthRoute);

server.listen(3000, () => console.log("Server started! Listening on port 3000.")); // Start the server and log a server start message to the console

// Note: It is a best practice to organize models and routes in separate folders such as '/models' and '/routes'
