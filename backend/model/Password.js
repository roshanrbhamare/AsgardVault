import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Use string name of model
    },
    url: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PasswordModel = mongoose.model("Password", passwordSchema);
export default PasswordModel;
