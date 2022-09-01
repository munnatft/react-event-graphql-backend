const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    const existingUser = await User.findOne({ email: args.userInput.email });
    if (existingUser) {
      throw new Error("User Already Exists!");
    }
    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    const newUser = new User({
      email: args.userInput.email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    return {
      ...result._doc,
      _id: result.id,
      password: null,
    };
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const isPasswordEqual = await bcrypt.compare(password, user.password);
      if (!isPasswordEqual) {
        throw new Error("Password is incorrect.");
      }
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        "somesupersecretprivatekeytohide",
        {
            expiresIn: "1h"
        }
      );
      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      }
    } catch (error) {
      throw error;
    }
  },
};
