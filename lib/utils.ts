import { ImageProps } from './interfaces';

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

export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  let from = 'ãàáäâáèéëêìíïîõòóöôùúüûñç·/_,:;';
  let to = 'aaaaaaeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

export function getAllBrandsWithSlugs(images: ImageProps[]) {
  if (images !== undefined) {
    const brands = getUniqueBrands(images);
    const brandSlugs = brands.map((brand) => slugify(brand));

    return Object.values(
      brands.reduce((acc, brand, index) => {
        acc[brandSlugs[index]] = { brand: brand, slug: brandSlugs[index] };
        return acc;
      }, {} as { [key: string]: { brand: string; slug: string } })
    );
  }
}

export function getBrandNameBySlug(images: ImageProps[], slug: string) {
  if (images !== undefined && slug !== undefined) {
    return getAllBrandsWithSlugs(images!)?.filter(
      (brand) => brand.slug === slug.toString()
    )[0]?.brand as string;
  }
}
