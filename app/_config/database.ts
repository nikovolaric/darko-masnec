import { connect, connections } from "mongoose";

async function connectDB() {
  if (connections[0].readyState) {
    return true;
  }

  try {
    await connect(process.env.MONGODB_URI as string);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
