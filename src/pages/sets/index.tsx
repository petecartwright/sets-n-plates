import Head from 'next/head'
import { Set } from '@/components/Set'
import { useEffect, useState } from 'react'
import { getSets } from '@/lib/utils'

export default function SetsPage() {
  const [bar, setBar] = useState<number>(45)
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
  }, [bar, startWeight, workWeight])

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
            <label htmlFor="bar">Bar</label>{' '}
            <select
              id="bar"
              name="bar"
              onChange={(e) => setBar(+e.currentTarget.value)}
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
              onChange={(e) => setStartWeight(+e.currentTarget.value)}
              min={bar.toString()}
              max="1000"
              defaultValue={bar.toString()}
              step="2.5"
              type="number"
            />
          </div>
          <div>
            <label htmlFor="workWeight"> Work Weight</label>{' '}
            <input
              id="workWeight"
              name="workWeight"
              onChange={(e) => setWorkWeight(+e.currentTarget.value)}
              min={bar.toString()}
              max="1000"
              defaultValue={bar.toString()}
              step="2.5"
              type="number"
            />
          </div>
          <div>
            {sets.length
              ? sets.map((set) => (
                  <Set key={set} targetWeight={set} barWeight={bar} />
                ))
              : null}
          </div>
        </div>
      </main>
    </>
  )
}
