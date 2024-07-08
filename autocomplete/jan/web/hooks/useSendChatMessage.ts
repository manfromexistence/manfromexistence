import { useEffect, useRef } from 'react'

import {
  ChatCompletionRole,
  MessageRequestType,
  ExtensionTypeEnum,
  Thread,
  ThreadMessage,
  Model,
  ConversationalExtension,
  EngineManager,
  ToolManager,
} from '@janhq/core'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

import { selectedModelAtom } from '@/containers/DropdownListSidebar'
import {
  currentPromptAtom,
  editPromptAtom,
  fileUploadAtom,
} from '@/containers/Providers/Jotai'

import { compressImage, getBase64 } from '@/utils/base64'
import { MessageRequestBuilder } from '@/utils/messageRequestBuilder'
import { toRuntimeParams, toSettingParams } from '@/utils/modelParam'

import { ThreadMessageBuilder } from '@/utils/threadMessageBuilder'

import { loadModelErrorAtom, useActiveModel } from './useActiveModel'

import { extensionManager } from '@/extension/ExtensionManager'
import {
  addNewMessageAtom,
  deleteMessageAtom,
  getCurrentChatMessagesAtom,
} from '@/helpers/atoms/ChatMessage.atom'
import {
  activeThreadAtom,
  engineParamsUpdateAtom,
  getActiveThreadModelParamsAtom,
  isGeneratingResponseAtom,
  updateThreadAtom,
  updateThreadWaitingForResponseAtom,
} from '@/helpers/atoms/Thread.atom'

export const queuedMessageAtom = atom(false)
export const reloadModelAtom = atom(false)

export default function useSendChatMessage() {
  const activeThread = useAtomValue(activeThreadAtom)
  const addNewMessage = useSetAtom(addNewMessageAtom)
  const updateThread = useSetAtom(updateThreadAtom)
  const updateThreadWaiting = useSetAtom(updateThreadWaitingForResponseAtom)
  const setCurrentPrompt = useSetAtom(currentPromptAtom)
  const deleteMessage = useSetAtom(deleteMessageAtom)
  const setEditPrompt = useSetAtom(editPromptAtom)

  const currentMessages = useAtomValue(getCurrentChatMessagesAtom)
  const selectedModel = useAtomValue(selectedModelAtom)
  const { activeModel, startModel } = useActiveModel()
  const loadModelFailed = useAtomValue(loadModelErrorAtom)

  const modelRef = useRef<Model | undefined>()
  const loadModelFailedRef = useRef<string | undefined>()
  const activeModelParams = useAtomValue(getActiveThreadModelParamsAtom)
  const engineParamsUpdate = useAtomValue(engineParamsUpdateAtom)

  const setEngineParamsUpdate = useSetAtom(engineParamsUpdateAtom)
  const setReloadModel = useSetAtom(reloadModelAtom)
  const [fileUpload, setFileUpload] = useAtom(fileUploadAtom)
  const setIsGeneratingResponse = useSetAtom(isGeneratingResponseAtom)
  const activeThreadRef = useRef<Thread | undefined>()
  const setQueuedMessage = useSetAtom(queuedMessageAtom)

  const selectedModelRef = useRef<Model | undefined>()

  useEffect(() => {
    modelRef.current = activeModel
  }, [activeModel])

  useEffect(() => {
    loadModelFailedRef.current = loadModelFailed
  }, [loadModelFailed])

  useEffect(() => {
    activeThreadRef.current = activeThread
  }, [activeThread])

  useEffect(() => {
    selectedModelRef.current = selectedModel
  }, [selectedModel])

  const resendChatMessage = async (currentMessage: ThreadMessage) => {
    if (!activeThreadRef.current) {
      console.error('No active thread')
      return
    }
    updateThreadWaiting(activeThreadRef.current.id, true)

    const requestBuilder = new MessageRequestBuilder(
      MessageRequestType.Thread,
      activeThreadRef.current.assistants[0].model ?? selectedModelRef.current,
      activeThreadRef.current,
      currentMessages
    )
      .addSystemMessage(activeThreadRef.current.assistants[0]?.instructions)
      .removeLastAssistantMessage()

    const modelId =
      selectedModelRef.current?.id ??
      activeThreadRef.current.assistants[0].model.id

    if (modelRef.current?.id !== modelId) {
      const error = await startModel(modelId).catch((error: Error) => error)
      if (error) {
        updateThreadWaiting(activeThreadRef.current.id, false)
        return
      }
    }

    setIsGeneratingResponse(true)

    if (currentMessage.role !== ChatCompletionRole.User) {
      // Delete last response before regenerating
      deleteMessage(currentMessage.id ?? '')
      if (activeThreadRef.current) {
        await extensionManager
          .get<ConversationalExtension>(ExtensionTypeEnum.Conversational)
          ?.writeMessages(
            activeThreadRef.current.id,
            currentMessages.filter((msg) => msg.id !== currentMessage.id)
          )
      }
    }
    // Process message request with Assistants tools
    const request = await ToolManager.instance().process(
      requestBuilder.build(),
      activeThreadRef.current.assistants?.flatMap(
        (assistant) => assistant.tools ?? []
      ) ?? []
    )

    const engine =
      requestBuilder.model?.engine ?? selectedModelRef.current?.engine ?? ''

    EngineManager.instance().get(engine)?.inference(request)
  }

  // Define interface extending Array prototype

  const sendChatMessage = async (message: string) => {
    if (!message || message.trim().length === 0) return

    if (!activeThreadRef.current) {
      console.error('No active thread')
      return
    }

    if (engineParamsUpdate) setReloadModel(true)

    const runtimeParams = toRuntimeParams(activeModelParams)
    const settingParams = toSettingParams(activeModelParams)

    const prompt = message.trim()

    updateThreadWaiting(activeThreadRef.current.id, true)
    setCurrentPrompt('')
    setEditPrompt('')

    let base64Blob = fileUpload[0]
      ? await getBase64(fileUpload[0].file)
      : undefined

    if (base64Blob && fileUpload[0]?.type === 'image') {
      // Compress image
      base64Blob = await compressImage(base64Blob, 512)
    }

    const modelRequest =
      selectedModelRef?.current ?? activeThreadRef.current.assistants[0].model

    // Fallback support for previous broken threads
    if (activeThreadRef.current?.assistants[0]?.model?.id === '*') {
      activeThreadRef.current.assistants[0].model = {
        id: modelRequest.id,
        settings: modelRequest.settings,
        parameters: modelRequest.parameters,
      }
    }
    if (runtimeParams.stream == null) {
      runtimeParams.stream = true
    }

    // Build Message Request
    const requestBuilder = new MessageRequestBuilder(
      MessageRequestType.Thread,
      {
        ...modelRequest,
        settings: settingParams,
        parameters: runtimeParams,
      },
      activeThreadRef.current,
      currentMessages
    ).addSystemMessage(activeThreadRef.current.assistants[0].instructions)

    requestBuilder.pushMessage(prompt, base64Blob, fileUpload[0]?.type)

    // Build Thread Message to persist
    const threadMessageBuilder = new ThreadMessageBuilder(
      requestBuilder
    ).pushMessage(prompt, base64Blob, fileUpload)

    const newMessage = threadMessageBuilder.build()

    // Push to states
    addNewMessage(newMessage)

    // Update thread state
    const updatedThread: Thread = {
      ...activeThreadRef.current,
      updated: newMessage.created,
      metadata: {
        ...(activeThreadRef.current.metadata ?? {}),
        lastMessage: prompt,
      },
    }
    updateThread(updatedThread)

    // Add message
    await extensionManager
      .get<ConversationalExtension>(ExtensionTypeEnum.Conversational)
      ?.addNewMessage(newMessage)

    // Start Model if not started
    const modelId =
      selectedModelRef.current?.id ??
      activeThreadRef.current.assistants[0].model.id

    if (base64Blob) {
      setFileUpload([])
    }

    if (modelRef.current?.id !== modelId) {
      setQueuedMessage(true)
      const error = await startModel(modelId).catch((error: Error) => error)
      setQueuedMessage(false)
      if (error) {
        updateThreadWaiting(activeThreadRef.current.id, false)
        return
      }
    }
    setIsGeneratingResponse(true)

    // Process message request with Assistants tools
    const request = await ToolManager.instance().process(
      requestBuilder.build(),
      activeThreadRef.current.assistants?.flatMap(
        (assistant) => assistant.tools ?? []
      ) ?? []
    )

    // Request for inference
    EngineManager.instance()
      .get(requestBuilder.model?.engine ?? modelRequest.engine ?? '')
      ?.inference(request)

    // Reset states
    setReloadModel(false)
    setEngineParamsUpdate(false)
  }

  return {
    sendChatMessage,
    resendChatMessage,
  }
}
