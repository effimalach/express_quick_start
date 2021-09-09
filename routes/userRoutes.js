const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const usersCollection = require('../db');

// Get all users
router.get('/', async(req, res) => {
    const users = await userService.getAll();
    res.send(users);
})

// Get a specific user
router.get('/:id', async(req, res) => { 
    const {id} = req.params;
    const user = await userService.getUser(id);
    console.log(user);
    if (!user) {
        res.status(404).send();
    } else {
        res.send(user);
    }
})

// Create a user
router.post('/', (req, res) => { // add a user
    const user = req.body;
    console.log(req.body)
    if (user.email && user.password && user.name) {
        const success = userService.addUser(user);
        if (success) {
            res.status(201).send('User added successfully');
        } else {
            res.status(203).send('Rejected')
        }
    } else {
        res.status(203).send('Rejected')
    }
})

// Delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    userService.deleteUserFromDB(id);
    res.send('User deleted successfully');
})

// Update a user
router.put('/:id', (req, res) => {
    const toUpdate = req.body;
    const { id } = req.params;
    const updatedUser = userService.updateUserFromDB(id, toUpdate);
    console.log(updatedUser)
    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(400).send();
    }
})


module.exports = router;