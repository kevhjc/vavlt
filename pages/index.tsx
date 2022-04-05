import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';

import { ImageProps } from '../lib/interfaces';

import Container from '../components/Container';
import Gallery from '../components/Gallery';

const Home = ({ images }: { images: ImageProps[] }) => {
  return (
    <Container>
      <Head>
        <title>Vault</title>
      </Head>
      <Gallery images={images} />
    </Container>
  );
};

export async function getStaticProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data } = await supabase.from('images').select('*').order('id');

  return {
    props: {
      images: data,
    },
  };
}

export default Home;
