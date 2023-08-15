const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        }
    }
)

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [friendSchema]
    },
);

const User = model('user', userSchema);

module.exports = User;
