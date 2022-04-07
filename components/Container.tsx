import Head from 'next/head';

import { ContainerProps } from '../lib/interfaces';

import Navbar from '../components/Navbar';

export default function Container(props: ContainerProps) {
  const { children } = props;

  const meta = {
    title: 'Vavlt',
    description: `placeholder`,
    type: 'website',
  };

  return (
    <div className="p-2 mx-auto">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
