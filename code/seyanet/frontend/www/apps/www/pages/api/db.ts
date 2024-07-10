import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://sumon:sumon1234@seyaha.pzour3n.mongodb.net/ProductList?retryWrites=true&w=majority&appName=seyaha"
    await mongoose.connect(uri)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}

export default connectDB
