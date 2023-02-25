import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [barWeight, setBarWeight] = useState<number>(45)
  const [targetWeight, setTargetWeight] = useState<number>(45)
  const [plates, setPlates] = useState<string>('')

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
                defaultValue="45"
              >
                <option value="15">15</option>
                <option value="35">35</option>
                <option value="45">45</option>
              </select>
            </div>
            <div>
              <label htmlFor="targetWeight">Weight</label>{' '}
              <input
                id="targetWeight"
                name="targetWeight"
                onChange={(e) => setTargetWeight(+e.currentTarget.value)}
                min={barWeight.toString()}
                max="1000"
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
