import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sets &apos;n&apos; Plates</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Link href="sets">
            <button
              // className="
              //   min-w-full
              //   rounded-xl
              //   border-2
              //   border-slate-900
              //   bg-slate-200
              //   py-12
              //   text-8xl
              //   text-black
              //   shadow-md
              //   "
              type="button"
            >
              Sets
            </button>
          </Link>
          <Link href="plates">
            <button
              // className="
              //   min-w-full
              //   rounded-xl
              //   border-2
              //   border-slate-900
              //   bg-slate-200
              //   py-12
              //   text-8xl
              //   text-black
              //   shadow-md
              //   "
              type="button"
            >
              Plates
            </button>
          </Link>
        </div>
      </main>
    </>
  )
}
