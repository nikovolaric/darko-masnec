import { model, models, Schema } from "mongoose";

const bioSchema = new Schema({
  upperText: String,
  lowerText: String,
  image: {
    type: String,
    required: true,
  },
});

const Bio = models?.Bio || model("Bio", bioSchema);

export default Bio;
