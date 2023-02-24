import { getPlatesForWeight } from '@/lib/utils'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Plates } from './Plates'
import styles from './Set.module.css'

interface ISetProps {
  targetWeight: number

  availablePlates?: number
  barWeight?: number
}

export function Set(props: ISetProps) {
  const { barWeight, targetWeight, availablePlates } = props

  const [newWeight, setNewWeight] = useState<number>(targetWeight)
  const [plates, setPlates] = useState<number[]>([])

  useEffect(() => {
    // get the plates for this weight but
    const plates = getPlatesForWeight(newWeight, barWeight)

    setPlates(plates)
  }, [newWeight, barWeight])

  function bumpWeight(bump: 'up' | 'down') {
    if (bump === 'up') setNewWeight(newWeight + 2.5)
    if (bump === 'down') setNewWeight(newWeight - 2.5)
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => bumpWeight('down')}>
        -
      </button>
      <div>Weight: {newWeight}</div>
      <button type="button" onClick={() => bumpWeight('up')}>
        +
      </button>
      <Plates plates={plates} />
    </div>
  )
}
