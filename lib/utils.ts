// what plates do we have at the gym?
const AVAILABLE_PLATES = [45, 25, 10, 5, 2.5, 1.25]

function getHeaviestPlate(
  targetWeight: number,
  availableWeights = AVAILABLE_PLATES
): number {
  for (let plate of availableWeights) {
    if (plate <= targetWeight) {
      return plate
    }
  }
  // if we've gotten this far and haven't found a match, uhoh
  throw new Error('No matching weights')
}

export function getPlatesForWeight(
  weight: number,
  barWeight = 45,
  availableWeights = AVAILABLE_PLATES
): number[] {
  // just to make sure no one gets too strong or makes our Big O too big
  if (weight > 1000) return []

  // the smallest increment we have is 1.25
  if (weight % 1.25 !== 0) return []

  // make sure availableWeights is sorted descending so we can start with bigger weights
  availableWeights.sort((a, b) => b - a)

  // we load the same plates on each side of the bar, so
  let oneSideWeight = (weight - barWeight) / 2

  const plates: number[] = []
  while (oneSideWeight > 0) {
    try {
      // find the heaviest plate that fits the current weight
      let heaviestPlate = getHeaviestPlate(oneSideWeight, availableWeights)
      plates.push(heaviestPlate)
      oneSideWeight = oneSideWeight - heaviestPlate
    } catch (err) {
      // if we can't make it work, return an empty array
      // or should it throw an error?
      return []
    }
  }
  return plates
}
