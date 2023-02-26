import { MAX_ALLOWED_WEIGHT } from '@/common/consts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BAR_WEIGHT_OPTIONS } from '@/common/consts'

export default function Home() {
  const router = useRouter()

  const [barWeight, setBarWeight] = useState<number>(45)
  const [targetWeight, setTargetWeight] = useState<number>(45)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const newUrl = `plates/${targetWeight}?bar=${barWeight}`
    router.push(newUrl)
  }

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="barWeight">Bar</label>{' '}
              <select
                id="barWeight"
                name="barWeight"
                onChange={(e) => setBarWeight(+e.currentTarget.value)}
                defaultValue={BAR_WEIGHT_OPTIONS.at(-1)}
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
              <label htmlFor="targetWeight">Weight</label>{' '}
              <input
                id="targetWeight"
                name="targetWeight"
                onChange={(e) => setTargetWeight(+e.currentTarget.value)}
                min={barWeight.toString()}
                max={MAX_ALLOWED_WEIGHT}
                defaultValue={barWeight.toString()}
                step="2.5"
                type="number"
              />
            </div>
            <button type="submit">what is it</button>
          </div>
        </form>
      </main>
    </>
  )
}
