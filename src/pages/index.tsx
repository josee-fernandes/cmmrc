import { NextPage } from 'next'
import Head from 'next/head'

import HomeTemplate from '~/components/templates/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeTemplate />
    </>
  )
}

export default Home
