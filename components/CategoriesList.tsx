import Link from 'next/link';
import pluralize from 'pluralize';

import { ImageProps } from 'lib/interfaces';
import { slugify, getCategories } from 'lib/utils';

export default function BrandsList({ images }: { images: ImageProps[] }) {
  pluralize.addUncountableRule('Denim');
  pluralize.addUncountableRule('Outerwear');
  const categories = getCategories(images);

  return (
    <div className="max-w-6xl">
      <div className="px-6 py-8">
        {categories.map((category, index) => (
          <ul key={index} className="text-xl w-fit hover:underline">
            <Link
              href={{
                pathname: '/categories/[slug]',
                query: { slug: slugify(category) },
              }}
            >
              {pluralize(category)}
            </Link>
          </ul>
        ))}
      </div>
    </div>
  );
}
