import Head from 'next/head'
import Image from 'next/image'
import styles from './starting-page.module.css'
import NewsList from '../news/NewsList'

const DUMMY_NEWS = [
  {
    id: 1,
    title: "Koliku platu stvarno zasluzujete?",
    description: "Da li je povecanje plate od 34% nasa realnost? Definitivno nije :(" +
      "Prema zvanicnim informacijama, ocekuje se povecanje od najvise 10%." +
      "Na sastanku je doneta takva odluka jer kako kazu 'Tako smo u mogucnosti xD'."
  }
];

const StartingPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Union</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <NewsList newsData={DUMMY_NEWS} className={styles.card} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://next-js-finalatlas.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/sditdevalt.svg" alt="SdItDev Logo" width={72} height={50} />
          </span>
        </a>
      </footer>
    </div>
  )
};

export default StartingPage;