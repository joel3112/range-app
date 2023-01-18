import Head from 'next/head';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';
import { Range } from '@/components/range/Range';
import { NORMAL_RANGE_URL } from '@/services';

export default function Exercise1() {
  const { data: normalRangeData, loading } = useFetch<{ min: number; max: number }>(
    NORMAL_RANGE_URL
  );

  return (
    <>
      <Head>
        <title>Range App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>Fixed values range</h1>

            {normalRangeData && <Range {...normalRangeData} defaultValue={[30, 80]} unit="€" />}

            <Link href="/">
              <h2>Home</h2>
            </Link>
          </>
        )}
      </main>
    </>
  );
}
