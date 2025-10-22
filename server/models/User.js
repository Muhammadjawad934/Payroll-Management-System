import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], require: 'user', required: true },
    profileImage: { type: String },
    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now},
});
 
const User = mongoose.model("User", userSchema);

export default User;