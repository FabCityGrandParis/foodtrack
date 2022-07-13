import styles from "@styles/layout.module.css"; import Head from "next/head";
import dynamic from "next/dynamic";
import Link from 'next/link'
import { FaKeybase, FaGithub, FaLinkedin, FaEnvelope, FaToolbox } from "react-icons/fa";

const ThemeSwitch = dynamic(() => import("@components/ThemeSwitch"), {
    ssr: false,
});

const {siteName, socials} = JSON.parse(process.env.NEXT_PUBLIC_SITE_INFOS);

export default function Layout({ page, children }) {
    return (
        <main className={styles.container}>
            <Head>
                    <meta name='application-name' content='essenlive.xyz' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='essenlive.xyz' />
                    <meta name='description' content="Quentin Perchais' space" />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-config' content='/icons/browserconfig.xml' />
                    <meta name='msapplication-TileColor' content='#355c7d' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <meta name='theme-color' content='#355c7d' />

                    <link rel='apple-touch-icon' href='/icons/apple-icon.png' />
                    <link rel='apple-touch-icon' sizes='152x152' href='/icons/apple-icon-152x152.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-icon-180x180.png' />    

                    <link rel='manifest' href='/manifest.json' />
                    <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#355c7d' />
                    {/* <link rel='shortcut icon' href='/favicon.ico' /> */}
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Poppins:300,400,500,800,900' />

                    <meta name='twitter:card' content="Quentin Perchais' space" />
                    <meta name='twitter:url' content='https://essenlive.xyz' />
                    <meta name='twitter:title' content='essenlive.xyz' />
                    <meta name='twitter:description' content="Quentin Perchais' space" />
                    {/* <meta name='twitter:image' content='https://essenlive.xyz/icons/android-icon-192x192.png' /> */}
                    <meta name='twitter:creator' content='@essenlive' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='essenlive.xyz' />
                    <meta property='og:description' content="Quentin Perchais' space" />
                    <meta property='og:site_name' content='essenlive.xyz' />
                    <meta property='og:url' content='https://essenlive.xyz' />
                    {/* <meta property='og:image' content='https://essenlive.xyz/icons/apple-icon.png' /> */}


                {page?.page_title && <title>Foodtrack | {page.page_title[0].plain_text}</title>}
                {page?.icon.emoji ? 
                    <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${page.icon.emoji}</text></svg>`}></link>
                    :
                    <>
                        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
                        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
                    </>
                }
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
                    <ThemeSwitch/>
            </header>
            {children}
            {/* <footer className={styles.footer}>
                built with <Link href={`https://notion.so`}>notion.so</Link> and <Link href={`https://nextjs.org/`}>next.js</Link> | <Link href={`https://github.com/essenlive/essenlive.xyz`}>github</Link>
            </footer> */}
        </main>
    );
}
