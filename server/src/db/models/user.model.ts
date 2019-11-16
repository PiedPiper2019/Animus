import mongoose, { Schema } from 'mongoose'

export interface IUser extends mongoose.Document {
    id: string;
    name: string;
  }
  
  export const UserSchema = new mongoose.Schema({
    id: { type: String, required: true, unique:true },
    name: { type: String, required: true }
  });
  
  const User = mongoose.model<IUser>("User", UserSchema);
  export default User;