import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    // Connect to DevelopmentDB database
    const UsersDBConnection = await mongoose.connect(
      process.env.MONGO_URI_SYDNEY,
      {
        dbName: "main",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `Connected to main database: ${UsersDBConnection.connection.readyState}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
