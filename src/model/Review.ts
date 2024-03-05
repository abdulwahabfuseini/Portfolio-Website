import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
