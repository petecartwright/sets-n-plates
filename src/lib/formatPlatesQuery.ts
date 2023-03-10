import invariant from 'tiny-invariant'

interface IFormatPlateQueryArgs {
  targetWeight: string | string[]
  availablePlates?: string | string[]
  barWeight?: string | string[]
}

interface IFormattedPlateQuery {
  targetWeight: number
  availablePlates?: number[]
  barWeight?: number
}

export function formatPlateQuery(
  args: IFormatPlateQueryArgs
): IFormattedPlateQuery {
  const { availablePlates, barWeight, targetWeight } = args

  let targetWeightFormatted: number
  let barWeightFormatted: number | undefined
  let availablePlatesFormatted: number[] | undefined

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

  if (availablePlatesFormatted) {
    if (typeof availablePlates === 'string') {
      let plateFormatted = Number(availablePlates)
      invariant(
        !isNaN(plateFormatted),
        'plates must be convertible to a number'
      )
      availablePlatesFormatted.push(+availablePlates)
    } else if (availablePlates) {
      // if it's not a string, it's a string array
      availablePlatesFormatted = availablePlates.map((item) => {
        let itemFormatted = Number(item)
        invariant(
          !isNaN(itemFormatted),
          'all available plates must be convertible to a number'
        )
        return itemFormatted
      })
    }
  }

  return {
    targetWeight: targetWeightFormatted,
    barWeight: barWeightFormatted,
    availablePlates: availablePlatesFormatted,
  }
}
