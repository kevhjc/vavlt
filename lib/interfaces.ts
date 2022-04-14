export interface ContainerProps {
  title?: string;
  children: JSX.Element[] | JSX.Element;
}

export interface NavProps {
  href: string;
  text: string;
}

export interface ImageProps {
  id: number;
  created_at: string;
  brands: string[];
  categories: string[];
  href: string;
}
