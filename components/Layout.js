import styles from "@styles/layout.module.css"; import Head from "next/head";
import Link from 'next/link'

export default function Layout({ page, children }) {
    return (
        <main className={styles.container}>
            <Head>
                <title>essenlive | {page.page_title[0].plain_text}</title>
                {page.icon.emoji && 
                    <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon.emoji}</text></svg>`}></link>}
            </Head>
              <Link href={`/`} >
                <h1 className={styles.title}>
                essenlive.xyz
                </h1>
                </Link>
            {children}
        </main>
    );
}