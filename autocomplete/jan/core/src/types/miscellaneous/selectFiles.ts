export type SelectFileOption = {
  /**
   * The title of the dialog.
   */
  title?: string
  /**
   * Whether the dialog allows multiple selection.
   */
  allowMultiple?: boolean

  buttonLabel?: string

  selectDirectory?: boolean

  props?: SelectFileProp[]

  filters?: FilterOption[]
}

export type FilterOption = {
  name: string
  extensions: string[]
}

export const SelectFilePropTuple = [
  'openFile',
  'openDirectory',
  'multiSelections',
  'showHiddenFiles',
  'createDirectory',
  'promptToCreate',
  'noResolveAliases',
  'treatPackageAsDirectory',
  'dontAddToRecent',
] as const

export type SelectFileProp = (typeof SelectFilePropTuple)[number]
