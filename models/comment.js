
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    date: { type: Date, required: true },
    message: { type: String, required: true },
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for comment's formatted data 
CommentSchema.virtual("formatted_date").get(function () {
    return this.date.toJSON().slice(0, 10).replace(/-/g, '/')
})

// Export model
module.exports = mongoose.model("Comment", CommentSchema);