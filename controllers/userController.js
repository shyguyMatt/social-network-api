const { User } = require('../models');

module.exports = {

// --- USER CONTROLS --- //
    // -- GET REQUESTS -- //
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUserbyId(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- POST REQUESTS -- //
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- PUT REQUESTS -- //
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $set: req.body },
                { runValidators: true, new: true },
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' })
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err) 
        }
    },

    // -- DELETE REQUESTS -- //
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' })
            }

            res.json({ message: 'User Successfully Deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

// --- FRIENDS LIST CONTROLS --- //
    // -- GET REQUESTS -- //
    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });
            if (!friend) {
                return res.status(404).json({ message: 'That user does not exist!' })
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: {username: friend.username} } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' })
            }
            
            res.json({ message: 'Friend added successfully' })

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- DELETE ROUTES -- //
    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { _id: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No user with this ID!' })
            }

            res.status(200).json({ message: 'Friendship successfully ended' })
        } catch (err) {
            res.status(500).json(err)
        }
    }
};
