
const { Thought } = require('../models');

const reactionController = {
    //    create new reaction add to the thought
    createNewReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true }
        ).then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json('No thoughts found with this id!')
            }
            res.json(thoughtData)
        })
    },

    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { runValidators: true, new: true }
        ).then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json('No thoughts found with this id!')
            }
            res.json(thoughtData)
        })
    }
}

module.exports = reactionController;