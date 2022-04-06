import { ImageProps } from '../lib/interfaces';

import { getUniqueBrands, getSections } from '../utils/getBrands';

export default function BrandsList({ images }: { images: ImageProps[] }) {
  const brands = getUniqueBrands(images);
  const sections = getSections(brands);

  return (
    <div className="max-w-7xl">
      <div className="px-6">
        <div className="grid py-8 mx-auto gap-y-8 md:gap-x-12 lg:grid-flow-col lg:grid-rows-5">
          {Object.values(sections).map((section, index) => (
            <div key={index} className="group">
              <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
                {section.char}
              </h2>
              {section.brands.map((brand, index) => (
                <ul key={index}>
                  <a href={`/brands/${brand}`} className="hover:underline">
                    {brand}
                  </a>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
