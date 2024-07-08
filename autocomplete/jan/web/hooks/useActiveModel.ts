import { useCallback, useEffect, useRef } from 'react'

import { EngineManager, Model } from '@janhq/core'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { toaster } from '@/containers/Toast'

import { LAST_USED_MODEL_ID } from './useRecommendedModel'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'
import { activeThreadAtom } from '@/helpers/atoms/Thread.atom'

export const activeModelAtom = atom<Model | undefined>(undefined)
export const loadModelErrorAtom = atom<string | undefined>(undefined)

type ModelState = {
  state: string
  loading: boolean
  model?: Model
}

export const stateModelAtom = atom<ModelState>({
  state: 'start',
  loading: false,
  model: undefined,
})

export let loadModelController: AbortController | undefined

export function useActiveModel() {
  const [activeModel, setActiveModel] = useAtom(activeModelAtom)
  const activeThread = useAtomValue(activeThreadAtom)
  const [stateModel, setStateModel] = useAtom(stateModelAtom)
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const setLoadModelError = useSetAtom(loadModelErrorAtom)

  const downloadedModelsRef = useRef<Model[]>([])

  useEffect(() => {
    downloadedModelsRef.current = downloadedModels
  }, [downloadedModels])

  const startModel = async (modelId: string) => {
    if (
      (activeModel && activeModel.id === modelId) ||
      (stateModel.model?.id === modelId && stateModel.loading)
    ) {
      console.debug(`Model ${modelId} is already initialized. Ignore..`)
      return Promise.resolve()
    }
    loadModelController = new AbortController()

    let model = downloadedModelsRef?.current.find((e) => e.id === modelId)

    const error = await stopModel().catch((error: Error) => error)
    if (error) {
      return Promise.reject(error)
    }

    setLoadModelError(undefined)

    setActiveModel(undefined)

    setStateModel({ state: 'start', loading: true, model })

    if (!model) {
      toaster({
        title: `Model ${modelId} not found!`,
        description: `Please download the model first.`,
        type: 'warning',
      })
      setStateModel(() => ({
        state: 'start',
        loading: false,
        model: undefined,
      }))

      return Promise.reject(`Model ${modelId} not found!`)
    }

    /// Apply thread model settings
    if (activeThread?.assistants[0]?.model.id === modelId) {
      model = {
        ...model,
        settings: {
          ...model.settings,
          ...activeThread.assistants[0].model.settings,
        },
      }
    }

    localStorage.setItem(LAST_USED_MODEL_ID, model.id)
    const engine = EngineManager.instance().get(model.engine)
    return engine
      ?.loadModel(model)
      .then(() => {
        setActiveModel(model)
        setStateModel(() => ({
          state: 'stop',
          loading: false,
          model,
        }))
        toaster({
          title: 'Success!',
          description: `Model ${model.id} has been started.`,
          type: 'success',
        })
      })
      .catch((error) => {
        if (loadModelController?.signal.aborted)
          return Promise.reject(new Error('aborted'))

        setStateModel(() => ({
          state: 'start',
          loading: false,
          model,
        }))

        toaster({
          title: 'Failed!',
          description: `Model ${model.id} failed to start.`,
          type: 'error',
        })
        setLoadModelError(error)
        return Promise.reject(error)
      })
  }

  const stopModel = useCallback(async () => {
    const stoppingModel = activeModel || stateModel.model
    if (!stoppingModel || (stateModel.state === 'stop' && stateModel.loading))
      return

    setStateModel({ state: 'stop', loading: true, model: stoppingModel })
    const engine = EngineManager.instance().get(stoppingModel.engine)
    return engine
      ?.unloadModel(stoppingModel)
      .catch()
      .then(() => {
        setActiveModel(undefined)
        setStateModel({ state: 'start', loading: false, model: undefined })
        loadModelController?.abort()
      })
  }, [activeModel, setActiveModel, setStateModel, stateModel])

  const stopInference = useCallback(async () => {
    // Loading model
    if (stateModel.loading) {
      stopModel()
      return
    }
    if (!activeModel) return

    const engine = EngineManager.instance().get(activeModel.engine)
    engine?.stopInference()
  }, [activeModel, stateModel, stopModel])

  return { activeModel, startModel, stopModel, stopInference, stateModel }
}
