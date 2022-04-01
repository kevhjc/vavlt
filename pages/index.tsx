import Head from 'next/head';

import type { NextPage } from 'next';

import Container from '../components/Container';
import Gallery from '../components/Gallery';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Vault</title>
      </Head>
      <Gallery />
    </Container>
  );
};

export default Home;
