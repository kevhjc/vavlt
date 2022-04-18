import Link from 'next/link';

import { ImageProps } from 'lib/interfaces';
import { getUniqueBrands, getSections, slugify } from 'lib/utils';

export default function BrandsList({ images }: { images: ImageProps[] }) {
  const brands = getUniqueBrands(images);
  const sections = getSections(brands);

  return (
    <div className="lg:max-w-7xl">
      <div className="px-6">
        <div className="grid py-8 mx-auto gap-y-8 lg:grid-flow-col lg:grid-rows-4">
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
