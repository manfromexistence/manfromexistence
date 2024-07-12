import { Schema, connect, model } from "mongoose"

export interface LanguageSchema {
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

export const languageSchema: Schema<LanguageSchema> = new Schema({
  imageUrl: { type: String },
  title: { type: String, require: true },
  description: { type: String, require: true },
  variation: { type: String, require: true },
  price: { type: String, require: true },
  exclusions: { type: String, require: true },
  interests: { type: String, require: true },
  transportation: { type: String, require: true },
  guidance: { type: String, require: true },
  path: { type: String, require: true },
  requirements: { type: String, require: true },
})

const contentSchema: Schema<{ translations: Map<string, LanguageSchema> }> =
  new Schema({
    translations: {
      type: Map,
      of: languageSchema,
    },
  })

const Content = model("content", contentSchema)
export default Content
