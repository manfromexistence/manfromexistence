declare const NODE: string
declare const INFERENCE_URL: string
declare const TROUBLESHOOTING_URL: string
declare const JAN_SERVER_INFERENCE_URL: string
declare const DEFAULT_SETTINGS: Array<any>
declare const MODELS: Array<any>

/**
 * The response from the initModel function.
 * @property error - An error message if the model fails to load.
 */
interface ModelOperationResponse {
  error?: any
  modelFile?: string
}
