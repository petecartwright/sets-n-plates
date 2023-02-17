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
      <main className="bg-gradient-to-br from-cyan-500 to-blue-500">
        <div className="flex flex-col justify-around items-center border-fuchsia-800 border-2 min-h-screen">
          <Link href="sets" className="min-w-[50%]">
            <button
              className="text-8xl 
                         border-2 
                         border-black 
                         bg-teal-400 
                         text-black 
                         py-12 
                         min-w-full"
              type="button"
            >
              Sets
            </button>
          </Link>
          <Link href="plates" className="min-w-[50%]">
            <button
              className="text-8xl 
                         border-2 
                         border-black 
                         bg-teal-400 
                         text-black 
                         min-w-full 
                         py-12"
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
