import { Schema, model, models } from "mongoose";

const InProgressSchema = new Schema({
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
