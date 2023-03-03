interface IPlatesProps {
  plates: number[]
}

export function Plates(props: IPlatesProps) {
  const { plates } = props

  let formattedPlates = plates.join(' | ')

  return (
    <div>
      {formattedPlates ? (
        <span>{formattedPlates}</span>
      ) : (
        <span>empty bar!</span>
      )}
    </div>
  )
}
