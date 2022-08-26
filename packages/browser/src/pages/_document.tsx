import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}