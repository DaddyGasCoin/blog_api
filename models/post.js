
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    date: { type: Date, required: true },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

});

// Virtual for message's formatted date
MessageSchema.virtual("formatted_date").get(function () {
    return this.date.toJSON().slice(0, 10).replace(/-/g, '/')
})

// Export model
module.exports = mongoose.model("Post", PostSchema);