const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    // updateUsers,
    // deleteUsers
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById);
    // .put(updateUsers)
    // .delete(deleteUsers);

module.exports = router;