export default function Information() {
  return (
    <div className="max-w-md">
      <div className="px-6 py-8">
        <div className="py-8 mx-auto gap-y-8">
          <h2 className="text-xl text-neutral-400 dark:text-neutral-500">
            What's Vavlt?
          </h2>
          <p>
            Vavlt (pronounced 'Vault') is the revival of a bygone{' '}
            <a
              href="http://web.archive.org/web/2020*/vavlt.tumblr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-1 hover:no-underline"
            >
              {`Tumblr site`}
            </a>{' '}
            where I'd post one outfit per day, presented in a four item grid.
          </p>
        </div>
        <h2 className="pt-4 text-xl text-neutral-400 dark:text-neutral-500">
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
