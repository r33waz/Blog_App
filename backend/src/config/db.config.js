import mongoose from "mongoose";

export const DBconnect = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;

    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Database is connected on", mongoose.connection.host);
  } catch (error) {
    console.log("Mongo Database is facing", error);
  }
};
