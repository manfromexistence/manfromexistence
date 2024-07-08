import connectDB from "./db"
import Content from "./model"

const deleteContent = async (id: string) => {
  try {
    await connectDB()

    const deletedContent = await Content.findByIdAndDelete(id)

    if (!deletedContent) {
      console.error("Content not found for deletion")
      return
    }

    console.log("Content deleted successfully:", deletedContent)
  } catch (error) {
    console.error("Error deleting content:", error)
  }
}

;(async () => {
  await deleteContent("your_content_id")
})()
