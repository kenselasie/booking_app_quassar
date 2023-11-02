import mongoose, { ConnectOptions } from "mongoose"

const databaseConnection = async () => {
  try {
    const URI = process.env.MONGO_URI!
    await mongoose.connect(URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB Connected: ${URI}`);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

export default databaseConnection;
