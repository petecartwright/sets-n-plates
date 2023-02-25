import { MAX_ALLOWED_WEIGHT } from '@/common/consts'
import { getPlatesForWeight } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Plates } from './Plates'
import styles from './Set.module.css'

interface ISetProps {
  targetWeight: number

  availablePlates?: number[]
  barWeight?: number
}

export function Set(props: ISetProps) {
  const { barWeight, targetWeight, availablePlates } = props

  const [newWeight, setNewWeight] = useState<number>(targetWeight)
  const [plates, setPlates] = useState<number[]>([])

  useEffect(() => {
    const plates = getPlatesForWeight({
      targetWeight: newWeight,
      barWeight,
      availablePlates,
    })

    setPlates(plates)
  }, [newWeight, barWeight, availablePlates])

  function bumpWeight(bump: 'up' | 'down') {
    if (bump === 'up') {
      if (newWeight + 2.5 <= MAX_ALLOWED_WEIGHT) setNewWeight(newWeight + 2.5)
    }
    if (bump === 'down') setNewWeight(newWeight - 2.5)
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={() => bumpWeight('down')}
      >
        -
      </button>
      <div>Weight: {newWeight}</div>
      <button
        className={styles.button}
        type="button"
        onClick={() => bumpWeight('up')}
      >
        +
      </button>
      <Plates plates={plates} />
    </div>
  )
}
