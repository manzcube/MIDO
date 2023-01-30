import { Schema, model } from "mongoose";

export const userSchema = Schema({
  name: {
    type: String,
    required: [true, "please, add your name"],
  },
  email: {
    type: String,
    required: [true, "please, add an email"],
    validate: {
      validator: function (value) {
        const emailRegex =
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "please, add a password"],
    validate: {
      validator: (value) => {
        return value.length > 6;
      },
      message: "Password too short",
    },
  },
});

export default model("users", userSchema);
