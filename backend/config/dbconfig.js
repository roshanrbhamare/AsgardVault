import mongoose from "mongoose";

const dbconnnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("database connection set successfully");
  } catch (e) {
    console.log(e);
  }
};

export default dbconnnection;