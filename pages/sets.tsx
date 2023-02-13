import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { getPlatesForWeight, getSets } from '@/lib/utils'

interface ISetWithPlates {
  weight: number
  plates: number[]
}

export default function SetsPage() {
  const [bar, setBar] = useState<number>(45)
  const [startWeight, setStartWeight] = useState<number>(45)
  const [workWeight, setWorkWeight] = useState<number>(45)
  const [setsWithPlates, setSetsWithPlates] = useState<ISetWithPlates[]>([])

  useEffect(() => {
    try {
      console.log('startWeight ', startWeight)
      console.log('workWeight ', workWeight)
      let sets = getSets({ startWeight: startWeight, workWeight: workWeight })
      console.log('sets is ', sets)
      let setsFormatted = sets.map((item) => {
        return {
          weight: item,
          plates: getPlatesForWeight(item, bar),
        }
      })
      console.log('setsFormatted is ', setsFormatted)

      setSetsWithPlates(setsFormatted)
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
      <main className={styles.main}>
        <div className={styles.container}>
          SETS
          <form>
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
              <label htmlFor="weigstartWeightht"> Start Weight</label>{' '}
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
              {setsWithPlates.length
                ? setsWithPlates.map((set) => {
                    console.log('set.plates', set.plates)
                    return (
                      <div
                        key={set.weight}
                        className={styles.weightPlateContainer}
                      >
                        <div>Weight: {set.weight}</div>
                        <div>{set.plates.join(', ')}</div>
                      </div>
                    )
                  })
                : null}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
