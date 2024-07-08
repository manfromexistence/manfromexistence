import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
const packageJson = require('./package.json')
const defaultSettingJson = require('./resources/default_settings.json')

const bakllavaJson = require('./resources/models/bakllava-1/model.json')
const codeninja7bJson = require('./resources/models/codeninja-1.0-7b/model.json')
const commandr34bJson = require('./resources/models/command-r-34b/model.json')
const deepseekCoder13bJson = require('./resources/models/deepseek-coder-1.3b/model.json')
const deepseekCoder34bJson = require('./resources/models/deepseek-coder-34b/model.json')
const dolphinPhi2Json = require('./resources/models/dolphin-phi-2/model.json')
const gemma2bJson = require('./resources/models/gemma-2b/model.json')
const gemma7bJson = require('./resources/models/gemma-7b/model.json')
const hermesPro7bJson = require('./resources/models/hermes-pro-7b/model.json')
const llama2Chat70bJson = require('./resources/models/llama2-chat-70b/model.json')
const llama2Chat7bJson = require('./resources/models/llama2-chat-7b/model.json')
const llamacorn1bJson = require('./resources/models/llamacorn-1.1b/model.json')
const llava13bJson = require('./resources/models/llava-13b/model.json')
const llava7bJson = require('./resources/models/llava-7b/model.json')
const miqu70bJson = require('./resources/models/miqu-70b/model.json')
const mistralIns7bq4Json = require('./resources/models/mistral-ins-7b-q4/model.json')
const mixtral8x7bInstructJson = require('./resources/models/mixtral-8x7b-instruct/model.json')
const noromaid7bJson = require('./resources/models/noromaid-7b/model.json')
const openchat357bJson = require('./resources/models/openchat-3.5-7b/model.json')
const openhermesNeural7bJson = require('./resources/models/openhermes-neural-7b/model.json')
const phind34bJson = require('./resources/models/phind-34b/model.json')
const qwen7bJson = require('./resources/models/qwen-7b/model.json')
const stableZephyr3bJson = require('./resources/models/stable-zephyr-3b/model.json')
const stealthv127bJson = require('./resources/models/stealth-v1.2-7b/model.json')
const tinyllama11bJson = require('./resources/models/tinyllama-1.1b/model.json')
const trinityv127bJson = require('./resources/models/trinity-v1.2-7b/model.json')
const vistral7bJson = require('./resources/models/vistral-7b/model.json')
const wizardcoder13bJson = require('./resources/models/wizardcoder-13b/model.json')
const yi34bJson = require('./resources/models/yi-34b/model.json')

export default [
  {
    input: `src/index.ts`,
    output: [{ file: packageJson.main, format: 'es', sourcemap: true }],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    watch: {
      include: 'src/**',
    },
    plugins: [
      replace({
        preventAssignment: true,
        MODELS: JSON.stringify([
          bakllavaJson,
          codeninja7bJson,
          commandr34bJson,
          deepseekCoder13bJson,
          deepseekCoder34bJson,
          dolphinPhi2Json,
          gemma2bJson,
          gemma7bJson,
          hermesPro7bJson,
          llama2Chat70bJson,
          llama2Chat7bJson,
          llamacorn1bJson,
          llava13bJson,
          llava7bJson,
          miqu70bJson,
          mistralIns7bq4Json,
          mixtral8x7bInstructJson,
          noromaid7bJson,
          openchat357bJson,
          openhermesNeural7bJson,
          phind34bJson,
          qwen7bJson,
          stableZephyr3bJson,
          stealthv127bJson,
          tinyllama11bJson,
          trinityv127bJson,
          vistral7bJson,
          wizardcoder13bJson,
          yi34bJson,
        ]),
        NODE: JSON.stringify(`${packageJson.name}/${packageJson.node}`),
        DEFAULT_SETTINGS: JSON.stringify(defaultSettingJson),
        INFERENCE_URL: JSON.stringify(
          process.env.INFERENCE_URL ||
            'http://127.0.0.1:3928/inferences/llamacpp/chat_completion'
        ),
        TROUBLESHOOTING_URL: JSON.stringify(
          'https://jan.ai/guides/troubleshooting'
        ),
        JAN_SERVER_INFERENCE_URL: JSON.stringify(
          'http://localhost:1337/v1/chat/completions'
        ),
        CUDA_DOWNLOAD_URL: JSON.stringify(
          'https://catalog.jan.ai/dist/cuda-dependencies/<version>/<platform>/cuda.tar.gz'
        ),
      }),
      // Allow json resolution
      json(),
      //     Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Compile TypeScript files
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        extensions: ['.js', '.ts', '.svelte'],
        browser: true,
      }),

      // Resolve source maps to the original source
      sourceMaps(),
    ],
  },
  {
    input: `src/node/index.ts`,
    output: [
      { file: 'dist/node/index.cjs.js', format: 'cjs', sourcemap: true },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['@janhq/core/node'],
    watch: {
      include: 'src/node/**',
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        extensions: ['.ts', '.js', '.json'],
      }),

      // Resolve source maps to the original source
      sourceMaps(),
    ],
  },
]
