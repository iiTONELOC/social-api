const { User, Thought } = require('../models');


const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no User is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.status(201).json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json('No users found with this id');
                }
                res.status(201).json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // remove friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends:  params.friendId  } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json('No users found with this id');
                }
                res.status(201).json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    async deleteUser({ params }, res) {
        // also need to delete associated 
        const userID = params.id
        try {
            const id = await User.findOne({ _id: params.id });
            Thought.deleteMany({ _id: { $in: id.thoughts} }).then(data => {
                console.log(data)
                User.findOneAndDelete({ _id: userID })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No User found with this id!' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.status(400).json(err));
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json(error);
        }


    }
}

module.exports = userController;