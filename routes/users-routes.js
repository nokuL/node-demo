const express = require('express');

const {getUsers, getUserById, createUser, patchUser, deleteUser} = require('../controllers/users-controller');

const router = express.Router();


router.get('/', getUsers);

router.get('/:uid', getUserById);

router.post('/', createUser);

router.patch('/:uid', patchUser);

router.delete('/:uid', deleteUser)

module.exports = router;