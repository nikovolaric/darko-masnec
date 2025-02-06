import { model, models, Schema } from "mongoose";

const exhibitionSchema = new Schema({
  duration: {
    type: String,
    required: true,
  },
  exhibitionName: {
    type: String,
    required: true,
  },
  groupSolo: String,
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    requrired: true,
    enum: ["collab", "solo"],
  },
  role: String,
});

const Exhibition = models.Exhibition || model("Exhibition", exhibitionSchema);

export default Exhibition;
