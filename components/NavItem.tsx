import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { NavProps } from '../lib/interfaces';

export default function NavItem({ href, text }: NavProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'text-neutral-800 underline hover:no-underline dark:text-neutral-100'
            : 'text-neutral-500 dark:text-neutral-400',
          'w-fit hover:underline'
        )}
      >
        <span>{text}</span>
      </a>
    </NextLink>
  );
}
