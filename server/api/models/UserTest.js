import mongoose from "mongoose";
const { Schema } = mongoose;

const UserTestSchema = new Schema(
  {
    FullName: {
      type: String,
      required: true,
      unique: true,
    },
    Position: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
    },
    Address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TestUser", UserTestSchema);
