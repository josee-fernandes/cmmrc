import { NextPage } from 'next'
import Head from 'next/head'

import HomeTemplate from '~/components/templates/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="author"
          content="Bruno Nascimento, Jhonata Coutinho, José Vitor"
        />
        <meta
          name="description"
          content="IHC - Página de demonstração para trabalho de projeto de interface."
        />
        <title>CMMRC. - IHC</title>
      </Head>
      <HomeTemplate />
    </>
  )
}

export default Home
