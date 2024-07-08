import { useMemo } from 'react'

import { Model } from '@janhq/core'

import { useAtomValue } from 'jotai'

import ExploreModelItem from '@/screens/ExploreModels/ExploreModelItem'

import { downloadedModelsAtom } from '@/helpers/atoms/Model.atom'

type Props = {
  models: Model[]
}

const ExploreModelList: React.FC<Props> = ({ models }) => {
  const downloadedModels = useAtomValue(downloadedModelsAtom)
  const sortedModels: Model[] = useMemo(() => {
    const featuredModels: Model[] = []
    const remoteModels: Model[] = []
    const localModels: Model[] = []
    const remainingModels: Model[] = []
    models.forEach((m) => {
      if (m.metadata?.tags?.includes('Featured')) {
        featuredModels.push(m)
      } else if (m.format === 'api') {
        remoteModels.push(m)
      } else if (downloadedModels.map((m) => m.id).includes(m.id)) {
        localModels.push(m)
      } else {
        remainingModels.push(m)
      }
    })
    featuredModels.sort((m1, m2) => m1.metadata.size - m2.metadata.size)
    remoteModels.sort((m1, m2) => m1.name.localeCompare(m2.name))
    localModels.sort((m1, m2) => m1.metadata.size - m2.metadata.size)
    remainingModels.sort((m1, m2) => m1.metadata.size - m2.metadata.size)
    return [
      ...featuredModels,
      ...remoteModels,
      ...localModels,
      ...remainingModels,
    ]
  }, [models, downloadedModels])

  return (
    <div className="relative h-full w-full flex-shrink-0">
      {sortedModels?.map((model) => (
        <ExploreModelItem key={model.id} model={model} />
      ))}
    </div>
  )
}

export default ExploreModelList
