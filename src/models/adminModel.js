const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      select: false, //hide it from the output(response )
    },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);
adminSchema.pre("save", async function (next) {
  //this point to current document = user , pre"save"" run when use user.save() in routers  patch or post, it work befor saving document to database and befor res.send
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
