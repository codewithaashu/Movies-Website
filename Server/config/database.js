import mongoose from "mongoose";
const MONGOURI =
  "mongodb+srv://codewithaashu1:MovieDose123@moviedb.vmoe9hr.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGOURI);
    console.log(
      `Connected Successfully with MongoDB at port ${connection.port}`
    );
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
};

export default connectDB;
