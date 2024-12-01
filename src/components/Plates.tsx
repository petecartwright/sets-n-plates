interface IPlatesProps {
  plates: number[]
}

export function Plates(props: IPlatesProps) {
  const { plates } = props

  // sort in descending order
  plates.sort((a, b) => (a > b ? -1 : 1))

  const uniquePlates = Array.from(new Set(plates))

  let plateCounts = {}
  for (const plate of plates) {
    if (plateCounts[plate]) {
      plateCounts[plate]++
    } else {
      plateCounts[plate] = 1
    }
  }

  const groupedPlates = uniquePlates.map((plate) => {
    return `${plate}${plateCounts[plate] > 1 ? ` x ${plateCounts[plate]}` : ''}`
  })

  let formattedPlates = groupedPlates.join(' | ')

  return (
    <div>
      {formattedPlates.length > 0 ? (
        <span>{formattedPlates}</span>
      ) : (
        <span>empty bar!</span>
      )}
    </div>
  )
}
