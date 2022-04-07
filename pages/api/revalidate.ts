export default async function handler(
  req: { query: { secret: string | undefined } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
      send: { (arg0: string): any; new (): any };
    };
    unstable_revalidate: (arg0: string) => any;
    json: (arg0: { revalidated: boolean }) => any;
  }
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.unstable_revalidate('/');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
