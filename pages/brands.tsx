import Head from 'next/head';

import type { NextPage } from 'next';

import Container from '../components/Container';
import BrandsList from '../components/BrandsList';

const Brands: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Vault — Brands</title>
      </Head>
      <BrandsList />
    </Container>
  );
};

export default Brands;
