const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        }
    },
    {
        timestamps: true
    }

)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;