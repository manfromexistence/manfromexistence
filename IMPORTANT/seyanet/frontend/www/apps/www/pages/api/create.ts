// Import the model
import connectDB from "./db"
import ProductModel from "./model"

// Import the connection function

const createProduct = async (name: string, price: number, stock: number) => {
  try {
    await connectDB() // Connect to MongoDB if not already connected

    const newProduct = new ProductModel({ name, price, stock })
    await newProduct.save()
    console.log("Product created successfully:", newProduct)
  } catch (error) {
    console.error("Error creating product:", error)
  }
}

;(async () => {
  await createProduct("T-Shirt", 25.99, 100)
})()
