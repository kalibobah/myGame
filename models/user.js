import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true,unique: true},
  timestamp: { type: Date, default: Date.now },
});

// module.exports = mongoose.model('User', UserSchema);
export default mongoose.model("User",UserSchema);
