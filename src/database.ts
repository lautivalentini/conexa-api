import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

export const connectToMongoDB = async () => {
  let connection;

  try {
    connection = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Database is connected");
  } catch (err) {
    console.log(err);
  }

  return connection;
};
