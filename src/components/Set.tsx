import { MAX_ALLOWED_WEIGHT } from '@/common/consts'
import { getPlatesForWeight } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Plates } from './Plates'

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
      })
      setPlates(plates)
    } catch (err) {
      setPlates([])
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
    <div className="flex py-3">
      <div className="flex justify-between items-center w-4/12">
        <button
          className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-3 border border-gray-500 hover:border-transparent rounded"
          type="button"
          onClick={() => bumpWeight('down')}
        >
          -
        </button>
        <div>{newWeight}</div>
        <button
          className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-3 border border-gray-500 hover:border-transparent rounded"
          type="button"
          onClick={() => bumpWeight('up')}
        >
          +
        </button>
      </div>

      <div className="flex pl-10 items-center">
        <Plates plates={plates} />
      </div>
    </div>
  )
}
