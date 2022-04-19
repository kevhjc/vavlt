import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import pluralize from 'pluralize';

import { ImageProps } from 'lib/interfaces';
import {
  capitalize,
  slugify,
  getCategories,
  getCategoryBySlug,
} from 'lib/utils';

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

  const categories = getCategories(data!);

  return {
    paths: categories?.map((category) => ({
      params: {
        slug: [slugify(category)],
      },
    })),
    fallback: false,
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
    entries.categories.includes(capitalize(params.slug))
  );

  return {
    props: {
      images: filteredResults,
    },
  };
}

export default function Category({ images }: { images: ImageProps[] }) {
  const router = useRouter();
  const category = getCategoryBySlug(images, router.query.slug as string);

  pluralize.addUncountableRule('Denim');
  pluralize.addUncountableRule('Footwear');
  pluralize.addUncountableRule('Outerwear');
  const categoryPlural = pluralize(category as string);

  return (
    <Container>
      <Head>
        <title>{categoryPlural} — Vault</title>
      </Head>
      {images ? (
        <>
          <div className="px-6 pt-8 mx-auto">
            <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
              Posts featuring{' '}
              <span className="font-bold text-neutral-800 dark:text-neutral-100">
                {categoryPlural}
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
