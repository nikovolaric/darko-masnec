import { model, models, Schema } from "mongoose";

const bannerSchema = new Schema({
  title: String,
  image: {
    type: String,
    required: true,
  },
});

const Banner = models?.Banner || model("Banner", bannerSchema);

export default Banner;
