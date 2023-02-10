// what plates do we have at the gym?
const AVAILABLE_PLATES = [45, 25, 10, 5, 2.5, 1.25]

function getHeaviestPlate(
  targetWeight: number,
  availableWeights: number[]
): number {
  for (let plate of availableWeights) {
    if (plate <= targetWeight) {
      return plate
    }
  }
  // we won't actually get here as written bc we
  // check in getPlatesForWeight that this function will return a value,
  // but this makes ts happy
  /* istanbul ignore next -- @preserve */
  return 0
}

export function getPlatesForWeight(
  weight: number,
  barWeight = 45,
  availableWeights = AVAILABLE_PLATES
): number[] {
  // make sure availableWeights is sorted descending so we can start with bigger weights
  availableWeights.sort((a, b) => b - a)

  // just to make sure no one gets too strong or makes our Big O too big
  if (weight > 1000) return []

  // if we have an empty bar or less weight than the bar
  if (weight <= barWeight) return []

  // we load the same plates on each side of the bar, so
  let oneSideWeight = (weight - barWeight) / 2

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
