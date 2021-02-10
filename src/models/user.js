const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive number")
            }
        }
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }

})
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.__v
    return userObject
}
const User = mongoose.model("User", userSchema)
module.exports = User

