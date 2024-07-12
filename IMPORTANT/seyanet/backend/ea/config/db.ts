import * as mongoose from 'mongoose'
import * as pc from 'picocolors'

export const connectDB = async () => {
  try {
    if (Bun.env.MONGO_URI !== undefined) {
      const conn = await mongoose.connect("mongodb+srv://sumon:sumon1234@seyaha.pzour3n.mongodb.net/ProductList?retryWrites=true&w=majority&appName=seyaha", {
        autoIndex: true,
      })

      console.log(
        pc.cyan(
          `Success: MongoDB Connected: ${conn.connection.host}:${conn.connection.port} - [${conn.connection.name}]`
        )
      )
    }
  } catch (err: any) {
    console.error(pc.red(`Error: ${err.message}`))
    process.exit(1)
  }
}
