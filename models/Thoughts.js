const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const ThoughtSchema = new Schema(
    {

        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        reactions: [reactionSchema],
    },
    // {
    //     // toJSON: {
    //     //  // getters: true
    //     // },
    //     id: false
    // }
);


// create the User model using the UserSchema
const Thought = model('thought', ThoughtSchema);

// export the User model
module.exports = Thought;