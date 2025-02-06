import { model, models, Schema } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  category: {
    type: String,
    enum: [
      "animated film",
      "interactive/videogame",
      "installations/video",
      "painting",
    ],
  },
  originalTitle: String,
  director: String,
  scriptwriters: String,
  animation: String,
  music: String,
  sound: String,
  editing: String,
  compositing: String,
  producer: String,
  duration: String,
  aspectRatio: String,
  technique: String,
  description: String,
  subtitle: String,
  link: String,
  distributionLink: String,
  voiceActing: String,
  mainImage: {
    type: String,
    required: true,
  },
  imgs: [String],
});

const Project = models.Project || model("Project", projectSchema);

export default Project;
