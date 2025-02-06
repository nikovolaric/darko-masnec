import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide your username!"],
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: [8, "A password must be at least 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: Object,
    required: [true, "Please confirm a password"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.password !== this.passwordConfirm) {
    throw new Error("Passwords must match");
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = models?.User || model("User", userSchema);

export default User;
