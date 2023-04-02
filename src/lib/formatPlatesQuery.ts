import { DEFAULT_AVAILABLE_PLATES } from '@/common/consts'
import invariant from 'tiny-invariant'

interface IFormatPlateQueryArgs {
  targetWeight: string | string[]
  barWeight?: string | string[]
}

interface IFormattedPlateQuery {
  targetWeight: number
  barWeight?: number
}

export function formatPlateQuery(
  args: IFormatPlateQueryArgs
): IFormattedPlateQuery {
  const { barWeight, targetWeight } = args
  const availablePlates = [...DEFAULT_AVAILABLE_PLATES]
  let targetWeightFormatted: number
  let barWeightFormatted: number | undefined

  invariant(typeof targetWeight === 'string', 'targetWeight must be a string')
  targetWeightFormatted = Number(targetWeight)
  invariant(
    !isNaN(targetWeightFormatted),
    'targetWeight must be convertible to a number'
  )

  if (barWeight) {
    invariant(typeof barWeight === 'string', 'bar weight must be a string')
    barWeightFormatted = Number(barWeight)
    invariant(
      !isNaN(barWeightFormatted),
      'bar weight must be convertible to a number'
    )
  }

  return {
    targetWeight: targetWeightFormatted,
    barWeight: barWeightFormatted,
  }
}
