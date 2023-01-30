import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    // Connect to DevelopmentDB database
    const UsersDBConnection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "main",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connected to main database: ${UsersDBConnection.connection.host}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// export const connect_to_mainDB = async () => {
//   try {
//     // Connect to DevelopmentDB database
//     const MainDBConnection = await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "main",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(
//       `Connected to main database: ${MainDBConnection.connection.host}`
//     );
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };
