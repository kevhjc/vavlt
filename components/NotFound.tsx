import NextLink from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl">
      <div className="px-6">
        <div className="py-8 mx-auto gap-y-8">
          <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
            <span className="font-bold text-neutral-800 dark:text-neutral-100">
              404
            </span>
            {' — Page not found'}
          </h2>
        </div>
        <div className="flex justify-start">
          <NextLink href="/">
            <button className="p-2 px-4 text-sm font-medium transition-all rounded cursor-pointer bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
              Go home
            </button>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
