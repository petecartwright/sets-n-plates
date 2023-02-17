import Head from 'next/head'
import { Inter } from '@next/font/google'
import { getPlatesForWeight } from '@/lib/utils'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [bar, setBar] = useState<number>(45)
  const [weight, setWeight] = useState<number>(45)
  const [plates, setPlates] = useState<string>('')

  useEffect(() => {
    const newPlates = getPlatesForWeight(+weight, +bar).join(', ')
    setPlates(newPlates)
  }, [weight, bar])

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-between">
          <form>
            <div>
              <h1 className="font-semibold text-slate-900">Just the Plates</h1>
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
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
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
            <div>
              <span>
                Use These Plates: <span data-testid="plates">{plates}</span>
              </span>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
