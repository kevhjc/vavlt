import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

import { ImageProps } from 'lib/interfaces';
import { getAllBrandsWithSlugs, getBrandNameBySlug } from 'lib/utils';

import Container from 'components/Container';
import PostGrid from 'components/PostGrid';

export async function getStaticPaths() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  const { data } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });

  const slugs = getAllBrandsWithSlugs(data!);

  return {
    paths: slugs?.map((brand) => ({
      params: {
        slug: [brand.slug],
      },
    })),
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
  const router = useRouter();

  const brand = getBrandNameBySlug(images, router.query.slug as string);

  return (
    <Container>
      <Head>
        <title>{brand} — Vault</title>
      </Head>
      {images ? (
        <>
          <div className="px-6 pt-8 mx-auto">
            <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
              Posts featuring{' '}
              <span className="font-bold text-neutral-800 dark:text-neutral-100">
                {brand}
              </span>
            </h2>
          </div>
          <PostGrid images={images} />
        </>
      ) : (
        <div className="px-6">
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
