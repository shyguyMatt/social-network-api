const Mongoose = require('mongoose');
const { Thought, User } = require('../models');

module.exports = {

// --- THOUGHT CONTROLS --- //
    // -- GET ROUTES -- //
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate();
            res.json(thoughts);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getThoughtbyId(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' })
            }

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- POST ROUTES -- //
    async createThought(req, res) {
        try {
            const user = await User.findOne({ _id: req.body.user });

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' })
            };

            const body = {
                thoughtText: req.body.thoughtText,
                user: req.body.user
            }
            const thought = await Thought.create(body);
            // user.thoughts.push(thought._id);

            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- PUT ROUTES -- //
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true},
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' })
            }

            res.status(200).json({ message: 'Thought Updated Successfully!' })

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- DELETE ROUTES -- //
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
                );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' })
            };
            
            res.status(200).json({ message: 'Thought Successfully Deleted!' });

        } catch (err) {
            res.status(500).json(err);
        }
    },

// --- REACTION CONTROLS --- //
    // -- POST ROUTES -- //
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { reactionBody: req.body.reactionBody } } },
                { runValidators: true, new: true }
            );

            res.json({message: 'successfully added a reaction!'})

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // -- DELETE ROUTES -- //
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No thought with this ID!' })
            }

            res.status(200).json({ message: 'Deleted Reaction Successfully!' })

        } catch (err) {
            res.status(500).json(err);
        }
    },

};
