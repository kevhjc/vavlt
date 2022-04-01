import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';

interface IContainerProps {
  title?: string;
  children: JSX.Element[] | JSX.Element;
}

export default function Container(props: IContainerProps) {
  const { children } = props;
  const router = useRouter();

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
