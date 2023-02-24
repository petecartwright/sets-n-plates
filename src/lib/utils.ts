import invariant from 'tiny-invariant'

export const DEFAULT_BAR_WEIGHT = 45
export const DEFAULT_AVAILABLE_PLATES = [45, 25, 10, 5, 2.5, 1.25]
const MAX_ALLOWED_WEIGHT = 1000

function getHeaviestPlate(
  targetWeight: number,
  availableWeights: number[]
): number {
  for (let plate of availableWeights) {
    if (plate <= targetWeight) {
      return plate
    }
  }
  // we won't actually get here as written bc we check in getPlatesForWeight
  // that this function will return a value, but this makes ts happy
  /* istanbul ignore next -- @preserve */
  return 0
}

// Function to get a list of plates where the bar + all plates = target weight
export function getPlatesForWeight(
  targetWeight: number,
  barWeight = DEFAULT_BAR_WEIGHT,
  availableWeights = DEFAULT_AVAILABLE_PLATES
): number[] {
  // make sure availableWeights is sorted descending so we can start with bigger weights
  availableWeights.sort((a, b) => b - a)

  // just to make sure no one gets too strong or makes our Big O too big
  invariant(targetWeight <= 1000, `max allowed weight is ${MAX_ALLOWED_WEIGHT}`)

  // throw if we have less weight than the bar
  invariant(
    targetWeight >= barWeight,
    `targetWeight must be higher than the bar weight`
  )

  // we load the same plates on each side of the bar, so
  let oneSideWeight = (targetWeight - barWeight) / 2

  // Make sure the oneSideWeight is acheivable with our weights
  // if we can modulo it for the smallest weight, we can do it for sure
  const smallestWeight = availableWeights[availableWeights.length - 1]
  if (oneSideWeight % smallestWeight !== 0) return []

  const plates: number[] = []
  while (oneSideWeight > 0) {
    // find the heaviest plate that fits the current weight
    let heaviestPlate = getHeaviestPlate(oneSideWeight, availableWeights)
    plates.push(heaviestPlate)
    oneSideWeight = oneSideWeight - heaviestPlate
  }
  return plates
}

interface IGetSetsProps {
  availablePlates?: number[]
  workWeight: number
  numSets?: number
  startWeight: number
}

export function getSets(props: IGetSetsProps): number[] {
  // function to get the weights for a list of warmup sets and one work set
  let { availablePlates, startWeight, workWeight, numSets } = props

  // set defaults if undefined
  numSets = numSets ?? 5

  // also if we have available plates, sort from largest to smallers
  availablePlates =
    availablePlates?.sort((a, b) => b - a) ?? DEFAULT_AVAILABLE_PLATES
  let smallestPlate = availablePlates[availablePlates.length - 1]

  // get the diff from start to end
  const firstToLastDiff = workWeight - startWeight

  // find out how much we need to jump per set to get from start to end
  const step = firstToLastDiff / (numSets - 1)

  // make sure the numbers make sense
  invariant(
    firstToLastDiff / (numSets - 1) >= smallestPlate * 2,
    'cant make the numbers work bro'
  )
  invariant(startWeight <= workWeight, 'start weight must be < workWeight')

  // we can't be sure that we can actually achieve `step` with the weights we have
  // so we need to make sure it's reachable by at least the smallest plate on each side
  const adjustedStep =
    Math.round(step / (smallestPlate * 2)) * (smallestPlate * 2)

  let sets = []

  // push the warmup sets
  for (let i = 0; i < numSets - 1; i++) {
    sets.push(startWeight + adjustedStep * i)
  }

  // the work set will always be at the workWeight. this will sometimes mean that
  // the last jump is different than the exact average, but it's OK. I promise.
  sets.push(workWeight)
  return sets
}