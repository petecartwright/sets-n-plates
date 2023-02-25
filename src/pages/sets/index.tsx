import Head from 'next/head'
import { Set } from '@/components/Set'
import { SyntheticEvent, useEffect, useState } from 'react'
import { getSets } from '@/lib/utils'
import { MAX_ALLOWED_WEIGHT } from '@/common/consts'

export default function SetsPage() {
  const [barWeight, setBarWeight] = useState<number>(45)
  const [startWeight, setStartWeight] = useState<number>(45)
  const [workWeight, setWorkWeight] = useState<number>(45)
  const [sets, setSets] = useState<number[]>([])

  useEffect(() => {
    try {
      let sets = getSets({ startWeight: startWeight, workWeight: workWeight })
      setSets(sets)
    } catch (err) {
      console.log(err)
    }
  }, [barWeight, startWeight, workWeight])

  function handleStartWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    // can't trust the input to handle the max value
    // if it's manually changed, so make sure we don't exceed it here
    const newStartWeight = Number(e.currentTarget.value)

    if (newStartWeight <= MAX_ALLOWED_WEIGHT && newStartWeight >= barWeight) {
      setStartWeight(newStartWeight)
    }
    // TODO - would be nice to throw an error here? maybe add form validation?
  }

  function handleWorkWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    // can't trust the input to handle the max value
    // if it's manually changed, so make sure we don't exceed it here
    const newWorkWeight = Number(e.currentTarget.value)
    if (newWorkWeight <= MAX_ALLOWED_WEIGHT) setWorkWeight(newWorkWeight)
    // TODO - would be nice to throw an error here? maybe add form validation?
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
              onChange={(e) => setBarWeight(+e.currentTarget.value)}
              defaultValue="45"
            >
              <option value="15">15</option>
              <option value="35">35</option>
              <option value="45">45</option>
            </select>
          </div>
          <div>
            <label htmlFor="startWeight"> Start Weight</label>{' '}
            <input
              id="startWeight"
              name="startWeight"
              onChange={handleStartWeightChange}
              min={barWeight.toString()}
              max={MAX_ALLOWED_WEIGHT}
              defaultValue={barWeight.toString()}
              step="2.5"
              type="number"
            />
          </div>
          <div>
            <label htmlFor="workWeight"> Work Weight</label>{' '}
            <input
              id="workWeight"
              name="workWeight"
              onChange={handleWorkWeightChange}
              min={barWeight.toString()}
              max="1000"
              defaultValue={barWeight.toString()}
              step="2.5"
              type="number"
            />
          </div>
          <div>
            {sets.length
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
