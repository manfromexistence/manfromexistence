import React from 'react'

import Hue from './Hue'
import Inputs from './Inputs'
import Square from './Square'
import Opacity from './Opacity'
import Presets from './Presets'
import Controls from './Controls'
import { usePicker } from '../context'
import GradientBar from './GradientBar'
import { LocalesProps } from '../shared/types'

const Picker = ({
  locales,
  presets,
  hideHue,
  hideInputs,
  hidePresets,
  hideOpacity,
  hideEyeDrop,
  hideControls,
  hideInputType,
  hideColorGuide,
  hideGradientType,
  hideGradientStop,
  hideGradientAngle,
  hideColorTypeBtns,
  hideAdvancedSliders,
  hideGradientControls,
}: PickerProps) => {
  const { isGradient } = usePicker()

  return (
    <div style={{ userSelect: 'none' }} id="rbgcp-wrapper">
      <Square />
      {!hideControls && (
        <Controls
          locales={locales}
          hideEyeDrop={hideEyeDrop}
          hideInputType={hideInputType}
          hideColorGuide={hideColorGuide}
          hideGradientType={hideGradientType}
          hideGradientStop={hideGradientStop}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientAngle={hideGradientAngle}
          hideAdvancedSliders={hideAdvancedSliders}
          hideGradientControls={hideGradientControls}
        />
      )}
      {isGradient && <GradientBar />}
      {!hideHue && <Hue />}
      {!hideOpacity && <Opacity />}
      {!hideInputs && <Inputs />}
      {!hidePresets && <Presets presets={presets} />}
    </div>
  )
}

export default Picker

type PickerProps = {
  hideControls?: boolean
  hideInputs?: boolean
  hidePresets?: boolean
  hideOpacity?: boolean
  hideHue?: boolean
  presets?: string[]
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
  hideGradientControls?: boolean
  locales?: LocalesProps
}
