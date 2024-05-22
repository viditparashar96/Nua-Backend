import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => boolean;
}

const UserSchema = new Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

const User = model<IUserModel>("User", UserSchema);
export default User;
