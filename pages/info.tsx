import Head from 'next/head';

import Container from 'components/Container';
import Information from 'components/Information';

export default function Info() {
  return (
    <Container>
      <Head>
        <title>Info — Vault</title>
      </Head>
      <Information />
    </Container>
  );
}
