import Head from 'next/head';

import { createClient } from '@supabase/supabase-js';

import { ImageProps } from 'lib/interfaces';
import { getAllBrandsWithSlugs, getBrandNameBySlug } from 'lib/utils';

import Container from 'components/Container';
import PostGrid from 'components/PostGrid';

export async function getStaticPaths() {
  return {
    paths: ['/brands/[...slug]'],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });

  const filteredResults = data?.filter((entries) =>
    entries.brands.includes(getBrandNameBySlug(data, params.slug))
  );

  return {
    props: {
      images: filteredResults,
    },
  };
}

export default function Brand({ images }: { images: ImageProps[] }) {
  return (
    <Container>
      <Head>
        <title>Brand — Vault</title>
      </Head>
      {images ? (
        <PostGrid images={images} />
      ) : (
        <div className="px-6 max-w-7xl">
          <div className="py-8 mx-auto gap-y-8">
            <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
              Loading...
            </h2>
          </div>
        </div>
      )}
    </Container>
  );
}
