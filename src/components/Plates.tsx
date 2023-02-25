import styles from './Plates.module.css'

interface IPlatesProps {
  plates: number[]
}

export function Plates(props: IPlatesProps) {
  const { plates } = props

  let formattedPlates = plates.join(' | ')

  return (
    <div className={styles.plates}>
      {formattedPlates ? (
        <span>Plates: {formattedPlates}</span>
      ) : (
        <span>empty bar!</span>
      )}
    </div>
  )
}
