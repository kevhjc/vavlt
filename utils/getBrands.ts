import { ImageProps } from '../lib/interfaces';

export function getUniqueBrands(images: ImageProps[]) {
  const allBrands = Object.values(images).reduce(
    (acc, image) => acc.concat(image.brands),
    [] as string[]
  );
  const brandsSet = new Set([...allBrands.sort()]);
  return Array.from(brandsSet);
}

export function getSections(brands: string[]) {
  if (brands.length === 0) {
    return [];
  }
  return Object.values(
    brands.reduce((acc, brand) => {
      let firstLetter = brand[0].toLocaleUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = { char: firstLetter, brands: [brand] };
      } else {
        acc[firstLetter].brands.push(brand);
      }
      return acc;
    }, {} as { [key: string]: { char: string; brands: string[] } })
  );
}
