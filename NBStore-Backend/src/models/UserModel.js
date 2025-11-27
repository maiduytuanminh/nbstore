const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }, // check và xem quyền
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
  },
  {
    timestamps: true,// sẽ có thời gian tạo và update
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password; // Optionally hide the password field
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password; // Optionally hide the password field
        return ret;
      },
    },
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;