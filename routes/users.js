const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practice");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing whitespace
  },
  password: {
    type: String
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostMessage",
    },
  ],
  dp: {
    type: String, // Assuming a URL for the profile picture
    default: "default-dp.jpg", // Provide a default image
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  }
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
