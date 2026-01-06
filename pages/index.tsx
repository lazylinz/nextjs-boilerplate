import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next.js 16 Boilerplate</title>
        <meta name="description" content="A modern Next.js 16 boilerplate with TypeScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Welcome to Next.js 16</h1>
          
          <p style={styles.description}>
            A modern boilerplate with TypeScript, Webhook API, and Vercel configuration
          </p>

          <div style={styles.grid}>
            <a href="/api/webhook" style={styles.card}>
              <h2>Webhook API →</h2>
              <p>POST endpoint for webhook events at /api/webhook</p>
            </a>

            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
            >
              <h2>Documentation →</h2>
              <p>Learn more about Next.js in the documentation</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.card}
            >
              <h2>Deploy →</h2>
              <p>Deploy this boilerplate on Vercel instantly</p>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

const styles = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  } as React.CSSProperties,
  container: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  } as React.CSSProperties,
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,
  description: {
    fontSize: '1.25rem',
    marginBottom: '3rem',
    color: '#666',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  } as React.CSSProperties,
  card: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
    textDecoration: 'none',
    color: '#0070f3',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  } as React.CSSProperties,
};

export default Home;
