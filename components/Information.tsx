export default function Information() {
  return (
    <div className="max-w-7xl">
      <div className="px-6">
        <div className="py-8 mx-auto gap-y-8">
          <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
            What's Vavlt?
          </h2>
          Vavlt is a revival of a project that was abandoned in the early days
          of the internet.
        </div>
        <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
          Who made it?
        </h2>
        Built by{' '}
        <a
          href="https://www.kevc.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-1 hover:no-underline"
        >
          {`Kevin`}
        </a>
        {' ✌️'}
      </div>
    </div>
  );
}
