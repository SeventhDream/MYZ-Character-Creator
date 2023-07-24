const express = require('express');
const router = express.Router();
const Character = require('../models/character');
const authenticate = require('../middleware/authenticate')



// Route for handling GET requests to '/characters'
router.get('/', authenticate, async (req, res) => {
    try {
        const characters = await Character.find({ user: req.userId }); // Retrieve all character items from the database
        res.json(characters); // Respond with the retrieved characters in JSON format
    } catch (err) {
        res.status(500).json({ message: err.message }); // If an error occurs, send an error response with the error message
    }
});

// Route for handling POST requests to '/characters'
router.post('/', authenticate, async (req, res) => {

    const character = new Character({
        name: req.body.name, // Retrieve the character's name from the request body
        profession: req.body.profession, // Retrieve the character's profession from the request body
        mutation: req.body.mutation, // Include the character's mutation from the request body
        avatar: req.body.avatar,
        user: req.userId,
    });
    try {
        const newCharacter = await character.save(); // Save the new character to the database
        res.status(201).json(newCharacter); // Respond with a 201 status code and the newly created character in JSON format
    } catch (err) {
        res.status(400).json({ message: err.message }); // If an error occurs, send a 400 status code and an error response with the error message
    }
});

// Route for handling DELETE requests to '/characters/:id'
router.delete('/:id', async (req, res) => {
    try {
      const character = await Character.findById(req.params.id); // Find the character by its ID
      if (!character) {
        return res.status(404).json({ message: 'Character not found' }); // If character is not found, return a 404 status code and an error message
      }
      await character.deleteCharacter(); // Remove the character from the database
      res.json({ message: 'Character deleted successfully' }); // Respond with a success message
    } catch (err) {
      res.status(500).json({ message: err.message }); // If an error occurs, send a 500 status code and an error response with the error message
    }
  });

module.exports = router; // Export the router module to make it available for use in other parts of the application
