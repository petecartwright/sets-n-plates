import Head from 'next/head'
import { Set } from '@/components/Set'
import { useEffect, useState } from 'react'
import { getPlatesForWeight, getSets } from '@/lib/utils'
import { BAR_WEIGHT_OPTIONS, MAX_ALLOWED_WEIGHT } from '@/common/consts'

// TODO - handle errors in Plates component
// TODO - style error text
// TODO - make sure workWeight is achievable with plates

export default function SetsPage() {
  const defaultBarWeight = BAR_WEIGHT_OPTIONS[BAR_WEIGHT_OPTIONS.length - 1]

  const [barWeight, setBarWeight] = useState<number>(defaultBarWeight)

  const [startWeight, setStartWeight] = useState<number>(defaultBarWeight)
  const [startWeightError, setStartWeightError] = useState('')

  const [workWeight, setWorkWeight] = useState<number>(defaultBarWeight)
  const [workWeightError, setWorkWeightError] = useState('')

  const [sets, setSets] = useState<number[]>([])

  useEffect(() => {
    try {
      let sets = getSets({ startWeight: startWeight, workWeight: workWeight })
      setSets(sets)
    } catch (err) {
      console.log(err)
      setSets([])
    }
  }, [barWeight, startWeight, workWeight])

  function handleBarWeightChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newBarWeight = Number(e.currentTarget.value)
    setBarWeight(newBarWeight)

    // if the other fields need to be adjusted, adjust them
    if (startWeight < barWeight) setStartWeight(barWeight)
    if (workWeight < barWeight) setWorkWeight(barWeight)
  }

  function handleStartWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    // clear the error
    setStartWeightError('')

    const newStartWeight = Number(e.currentTarget.value)

    if (isNaN(newStartWeight)) {
      setStartWeightError(`Must be a number`)
      return
    }

    if (newStartWeight > MAX_ALLOWED_WEIGHT) {
      setStartWeightError(`Must be less than or equal to ${MAX_ALLOWED_WEIGHT}`)
    }

    if (newStartWeight < barWeight) {
      setStartWeightError(
        'Must be greater than or equal to the weight of the bar'
      )
    }

    if (newStartWeight > workWeight) {
      setStartWeightError(`Must be less than or equal to the work weight`)
    }

    setStartWeight(newStartWeight)
  }

  function handleWorkWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWorkWeightError('')
    const newWorkWeight = Number(e.currentTarget.value)

    if (isNaN(newWorkWeight)) {
      setWorkWeightError(`Must be a number`)
      return
    }

    if (newWorkWeight > MAX_ALLOWED_WEIGHT) {
      setWorkWeightError(`Must be less than or equal to ${MAX_ALLOWED_WEIGHT}`)
    }

    if (newWorkWeight < barWeight) {
      setWorkWeightError(
        'Must be greater than or equal to the weight of the bar'
      )
    }

    // make sure we can generate plates for the final set

    if (
      getPlatesForWeight({ targetWeight: newWorkWeight, barWeight }).length ===
      0
    ) {
      setWorkWeightError(
        "Can't make this work weight with the available plates"
      )
    }

    setWorkWeight(newWorkWeight)
  }

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          SETS
          <div>
            <label htmlFor="barWeight">Bar</label>{' '}
            <select
              id="barWeight"
              name="barWeight"
              onChange={handleBarWeightChange}
              defaultValue="45"
            >
              {BAR_WEIGHT_OPTIONS.map((weightOption) => {
                return (
                  <option key={weightOption} value={weightOption}>
                    {weightOption}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <label htmlFor="startWeight"> Start Weight</label>{' '}
            <input
              id="startWeight"
              name="startWeight"
              onChange={handleStartWeightChange}
              defaultValue={barWeight.toString()}
              value={startWeight}
              type="text"
            />
            {startWeightError ? <div>{startWeightError} </div> : null}
          </div>
          <div>
            <label htmlFor="workWeight"> Work Weight</label>{' '}
            <input
              id="workWeight"
              name="workWeight"
              onChange={handleWorkWeightChange}
              defaultValue={barWeight.toString()}
              value={workWeight}
              type="text"
            />
          </div>
          {workWeightError ? <div>{workWeightError} </div> : null}
          <div>
            {!workWeightError && !startWeightError && sets.length
              ? sets.map((setWeight) => (
                  <Set
                    key={setWeight}
                    targetWeight={setWeight}
                    barWeight={barWeight}
                  />
                ))
              : null}
          </div>
        </div>
      </main>
    </>
  )
}
