import Link from 'next/link';
import pluralize from 'pluralize';

import { ImageProps } from 'lib/interfaces';
import { slugify, getCategories } from 'lib/utils';

export default function BrandsList({ images }: { images: ImageProps[] }) {
  pluralize.addUncountableRule('Denim');
  pluralize.addUncountableRule('Footwear');
  pluralize.addUncountableRule('Outerwear');
  const categories = getCategories(images);

  return (
    <div className="max-w-6xl">
      <div className="px-6">
        <div className="grid py-8 lg:grid-flow-row">
          {categories.map((category, index) => (
            <ul key={index} className="w-fit hover:underline">
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
    </div>
  );
}
