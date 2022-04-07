import Head from 'next/head';

import { ImageProps } from 'lib/interfaces';

import Container from 'components/Container';
import Information from 'components/Information';

export default function Brands({ images }: { images: ImageProps[] }) {
  return (
    <Container>
      <Head>
        <title>Info — Vault</title>
      </Head>
      <Information />
    </Container>
  );
}
