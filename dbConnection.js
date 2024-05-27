import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to Connect Mongo DB ....".bgYellow.bold);
    let CT = ""
    if (process.env.DEV_MODE === "production") {
      CT = process.env.CONNECTION_STRING
    } else {
      CT = process.env.MONGO_LOCAL_URL;
    }

    const conn = await mongoose.connect(CT);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
