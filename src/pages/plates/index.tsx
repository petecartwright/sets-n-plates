import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()

  const [bar, setBar] = useState<number>(45)
  const [weight, setWeight] = useState<number>(45)
  const [plates, setPlates] = useState<string>('')

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    const newUrl = `plates/${weight}?bar=${bar}`
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
              <label htmlFor="weight">Weight</label>{' '}
              <input
                className="w-full appearance-none rounded-md py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="weight"
                name="weight"
                onChange={(e) => setWeight(+e.currentTarget.value)}
                min={bar.toString()}
                max="1000"
                defaultValue={bar.toString()}
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
