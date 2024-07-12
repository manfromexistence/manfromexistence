import connectDB from "./db"
import Content from "./model"

export interface NewLanguage {
  imageUrl?: string
  title: string
  description: string
  variation: string
  price: string
  exclusions: string
  interests: string
  transportation: string
  guidance: string
  path: string
  requirements: string
}

type UpdateLanguage = Partial<NewLanguage>

const updateContent = async (
  id: string,
  languageCode: string,
  updatedLanguage: UpdateLanguage
) => {
  try {
    await connectDB() // Connect to MongoDB if not already connected

    const content = await Content.findById(id)

    if (!content) {
      console.error("Content not found for update")
      return
    }

    const existingTranslation = content.translations.get(languageCode)
    if (!existingTranslation) {
      console.error(`Language '${languageCode}' not found in translations`)
      return
    }

    content.translations.set(languageCode, {
      ...existingTranslation,
      ...updatedLanguage,
    })
    await content.save()

    console.log("Content updated successfully:", content)
  } catch (error) {
    console.error("Error updating content:", error)
  }
}

;(async () => {
  const updatedLanguage: UpdateLanguage = { description: "Updated description" }
  await updateContent("your_content_id", "en", updatedLanguage)
})()
