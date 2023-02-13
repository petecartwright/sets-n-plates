import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { getPlatesForWeight } from '@/lib/utils'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [bar, setBar] = useState<number>(45)
  const [weight, setWeight] = useState<number>(45)
  const [plates, setPlates] = useState<string>('')

  useEffect(() => {
    const newPlates = getPlatesForWeight(+weight, +bar).toString()
    setPlates(newPlates)
  }, [weight, bar])

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
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
              <label htmlFor="weight">Weight</label>{' '}
              <input
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
