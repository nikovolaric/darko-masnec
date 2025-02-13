import { model, models, Schema } from "mongoose";

const awardSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  awardTitle: String,
  festival: String,
  location: {
    type: String,
    required: true,
  },
  type: String,
  institute: String,
});

const Award = models.Award || model("Award", awardSchema);

export default Award;
