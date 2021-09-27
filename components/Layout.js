import styles from "@styles/layout.module.css"; import Head from "next/head";
import Link from 'next/link'
import { FaKeybase, FaGithub, FaLinkedin, FaEnvelope, FaToolbox } from "react-icons/fa";


const {siteName, socials} = JSON.parse(process.env.NEXT_PUBLIC_SITE_INFOS);

export default function Layout({ page, children }) {
    return (
        <main className={styles.container}>
            <Head>
                <title>essenlive | {page.page_title[0].plain_text}</title>
                {page.icon.emoji && 
                    <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon.emoji}</text></svg>`}></link>}
            </Head>
            <header className={styles.header}>

                    <Link href={`/`} >
                        <h1 className={styles.title}>
                        {siteName}
                        </h1>
                    </Link>
                <div className={styles.socials}>
                    {socials.mail &&
                        <Link href={`mailto:${socials.mail}`} >
                        <span><FaEnvelope /></span>
                        </Link>}
                    {socials.github &&
                        <Link href={`${socials.github}`} >
                        <span>    <FaGithub /></span>
                        </Link>}
                    {socials.linkedin &&
                        <Link href={`${socials.linkedin}`} >
                        <span><FaLinkedin /></span>
                        </Link>}
                    {socials.keybase &&
                        <Link href={`${socials.keybase}`} >
                        <span>    <FaKeybase/></span>
                        </Link>}
                    {socials.wikifactory &&
                        <Link href={`${socials.wikifactory}`} >
                        <span><FaToolbox /></span>
                        </Link>}
                    </div>
            </header>
            {children}
            <footer className={styles.footer}>
                built with <Link href={`https://notion.so`}>notion.so</Link> and <Link href={`https://nextjs.org/`}>next.js</Link> | <Link href={`https://github.com/essenlive/essenlive.xyz`}>github</Link>
            </footer>
        </main>
    );
}
