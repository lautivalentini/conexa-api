import mongoose, { ConnectOptions } from "mongoose";
import config from "./config";

export const startConnection = async () => {
  let connection;

  try {
    connection = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    console.log(err);
  }

  return connection;
};

export const closeConnection = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};
