/**
 * Represents the information about a model.
 * @stored
 */
export type ModelInfo = {
  id: string
  settings: ModelSettingParams
  parameters: ModelRuntimeParams
  engine?: InferenceEngine
}

/**
 * Represents the inference engine.
 * @stored
 */

export enum InferenceEngine {
  nitro = 'nitro',
  openai = 'openai',
  groq = 'groq',
  triton_trtllm = 'triton_trtllm',
  nitro_tensorrt_llm = 'nitro-tensorrt-llm',
}

export type ModelArtifact = {
  filename: string
  url: string
}

/**
 * Model type defines the shape of a model object.
 * @stored
 */
export type Model = {
  /**
   * The type of the object.
   * Default: "model"
   */
  object: string

  /**
   * The version of the model.
   */
  version: string

  /**
   * The format of the model.
   */
  format: string

  /**
   * The model download source. It can be an external url or a local filepath.
   */
  sources: ModelArtifact[]

  /**
   * The model identifier, which can be referenced in the API endpoints.
   */
  id: string

  /**
   * Human-readable name that is used for UI.
   */
  name: string

  /**
   * The Unix timestamp (in seconds) for when the model was created
   */
  created: number

  /**
   * Default: "A cool model from Huggingface"
   */
  description: string

  /**
   * The model settings.
   */
  settings: ModelSettingParams

  /**
   * The model runtime parameters.
   */
  parameters: ModelRuntimeParams

  /**
   * Metadata of the model.
   */
  metadata: ModelMetadata
  /**
   * The model engine.
   */
  engine: InferenceEngine
}

export type ModelMetadata = {
  author: string
  tags: string[]
  size: number
  cover?: string
}

/**
 * The available model settings.
 */
export type ModelSettingParams = {
  ctx_len?: number
  ngl?: number
  embedding?: boolean
  n_parallel?: number
  cpu_threads?: number
  prompt_template?: string
  system_prompt?: string
  ai_prompt?: string
  user_prompt?: string
  llama_model_path?: string
  mmproj?: string
  cont_batching?: boolean
  vision_model?: boolean
  text_model?: boolean
}

/**
 * The available model runtime parameters.
 */
export type ModelRuntimeParams = {
  temperature?: number
  token_limit?: number
  top_k?: number
  top_p?: number
  stream?: boolean
  max_tokens?: number
  stop?: string[]
  frequency_penalty?: number
  presence_penalty?: number
  engine?: string
}

export type ModelInitFailed = Model & {
  error: Error
}
