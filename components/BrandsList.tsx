import Link from 'next/link';

import { ImageProps } from 'lib/interfaces';
import { slugify, getUniqueBrands, getSections } from 'lib/utils';

export default function BrandsList({ images }: { images: ImageProps[] }) {
  const brands = getUniqueBrands(images);
  const sections = getSections(brands);

  return (
    <div className="max-w-6xl">
      <div className="px-6">
        <div className="grid py-8 gap-y-8 lg:grid-flow-col lg:grid-rows-5">
          {Object.values(sections).map((section, index) => (
            <div key={index} className="group">
              <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
                {section.char}
              </h2>
              {section.brands.map((brand, index) => (
                <ul key={index} className="w-fit hover:underline">
                  <Link
                    href={{
                      pathname: '/brands/[slug]',
                      query: { slug: slugify(brand) },
                    }}
                  >
                    {brand}
                  </Link>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
