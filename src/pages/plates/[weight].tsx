import Head from 'next/head'
import { getPlatesForWeight } from '@/lib/utils'
import { useRouter } from 'next/router'
import invariant from 'tiny-invariant'
import { useState } from 'react'

export default function Plates() {
  const router = useRouter()
  const { weight, bar, availablePlates } = router.query

  const [plates, setPlates] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')

  if (weight && !plates && !errorText) {
    invariant(typeof weight === 'string', 'missing weight')
    let platesForWeight: string
    platesForWeight = getPlatesForWeight(+weight).join(', ')
    if (platesForWeight) {
      setPlates(platesForWeight)
    } else {
      setErrorText("Can't make these plates work!")
    }
  }

  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {errorText ? <div>{errorText}</div> : null}

      {!errorText ? (
        <div>
          <div>Weight: {weight}</div>
          <br />
          <div>
            Use These Plates: <span data-testid="plates">{plates}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}
