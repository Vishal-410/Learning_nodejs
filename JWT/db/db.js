import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1/jwt1")
    console.log("mongoDb connected")

  } catch (error) {
    console.error("eRROR while Connecting to database", error)


  }

}

