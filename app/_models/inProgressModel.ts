import { Schema, model, models } from "mongoose";

const InProgressSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgs: {
    type: [String],
  },
});

const InProgress = models.InProgress || model("InProgress", InProgressSchema);

export default InProgress;
