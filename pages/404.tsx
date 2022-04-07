import Head from 'next/head';

import Container from 'components/Container';
import NotFound from 'components/NotFound';

export default function Custom404() {
  return (
    <Container>
      <Head>
        <title>404 — Vault</title>
      </Head>
      <NotFound />
    </Container>
  );
}
