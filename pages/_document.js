import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const locale = ctx.query.lang

        const additionalProps = {
            locale
        }

        return { ...initialProps, ...additionalProps }
    }

    render() {

        const { locale } = this.props

        return (
            <Html lang={locale} >
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument