import { MAX_ALLOWED_WEIGHT } from '@/common/consts'
import { getPlatesForWeight } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Plates } from './Plates'
import styles from './Set.module.css'

interface ISetProps {
  targetWeight: number
  barWeight: number

  availablePlates?: number[]
}

export function Set(props: ISetProps) {
  const { barWeight, targetWeight, availablePlates } = props

  const [newWeight, setNewWeight] = useState<number>(targetWeight)
  const [plates, setPlates] = useState<number[]>([])

  useEffect(() => {
    try {
      const plates = getPlatesForWeight({
        targetWeight: newWeight,
        barWeight,
        availablePlates,
      })
      setPlates(plates)
    } catch (err) {
      console.log('error is ', err)
    }
  }, [newWeight, barWeight, availablePlates])

  function bumpWeight(bump: 'up' | 'down') {
    if (bump === 'up') {
      if (newWeight + 2.5 <= MAX_ALLOWED_WEIGHT) setNewWeight(newWeight + 2.5)
    }
    if (bump === 'down') {
      if (newWeight - 2.5 >= barWeight) setNewWeight(newWeight - 2.5)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['weightContainer']}>
        <button
          className={styles.button}
          type="button"
          onClick={() => bumpWeight('down')}
        >
          -
        </button>
        <div>{newWeight}</div>
        <button
          className={styles.button}
          type="button"
          onClick={() => bumpWeight('up')}
        >
          +
        </button>
      </div>
      <div className={styles['platesContainer']}>
        <Plates plates={plates} />
      </div>
    </div>
  )
}
