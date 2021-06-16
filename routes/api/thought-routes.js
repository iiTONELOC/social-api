const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

const {
    createNewReaction,
    deleteReaction
} = require('../../controllers/reaction-controller');
// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
  
// update, delete, get one
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

// reactions
router
.route('/:thoughtId/reactions')
.post(createNewReaction)
.put(deleteReaction);


module.exports = router;