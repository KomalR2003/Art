import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type Role = "user" | "artist" | "admin";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  mobile?: string;
  dob: Date;
  role: Role;
  experience?: number;
  specialization?: string;
  portfolio?: string;
  bio?: string;
  agree?: boolean;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    mobile: { type: String },
    dob: { type: Date, required: true },
    role: { type: String, enum: ["user", "artist", "admin"], default: "user" },
    experience: { type: Number },
    specialization: { type: String },
    portfolio: { type: String },
    bio: { type: String },
    agree: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
  transform(_doc: unknown, ret: unknown) {
    delete (ret as { password?: unknown }).password;
    delete (ret as { __v?: unknown }).__v;
    return ret;
  },
},
  }
);


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const user = this as IUser; 

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
