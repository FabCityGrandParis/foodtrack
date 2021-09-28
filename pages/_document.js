import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    
    render() {
        const umami = !process.env.NEXT_PUBLIC_UMAMI ? process.env.NEXT_PUBLIC_UMAMI : JSON.parse(process.env.NEXT_PUBLIC_UMAMI);
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    {umami && <script async defer data-website-id={umami.id} src={umami.url}></script> }
                </body>
            </Html>
        )
    }
}

export default MyDocument