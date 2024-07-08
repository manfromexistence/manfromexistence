import connectDB from "./db"
import ProductModel from "./model"

const getAllProducts = async () => {
  try {
    await connectDB()

    const products = await ProductModel.find()
    console.log("Products:", products)
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

;(async () => {
  await getAllProducts()
})()
