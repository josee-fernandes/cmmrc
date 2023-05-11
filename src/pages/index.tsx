import Head from 'next/head'

import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${rubik.className}`}>
      <Head>
        <title>Home</title>
      </Head>
      oi
    </main>
  )
}
