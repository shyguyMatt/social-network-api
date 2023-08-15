const router = require('express').Router();
const {
    getThoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/appController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtbyId).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reaction').post(createReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
