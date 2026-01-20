const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {  type: String,  required: true,  minlength: 8,
      validate: {
        validator: function (value) {  // must have uppercase, lowercase, number
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message:  "Password must be at least 8 characters and include uppercase, lowercase, and a number",
      },
    },

    role: {type: String,  enum: ["user", "admin"],  default: "user",},

    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Hashing password before save (pre middleware)
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare password method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
