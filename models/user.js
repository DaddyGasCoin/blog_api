
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100, minLenth: 1 },
    last_name: { type: String, required: true, maxLength: 100, minLenth: 1 },
    username: { type: String, required: true, maxLength: 100, minLenth: 3, unique: true, index: true },
    password: { type: String, required: true, maxLength: 100 },
    admin: { type: Boolean, default: false }

});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
    return `${this.first_name} ${this.last_name}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);