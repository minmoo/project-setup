import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document"
import { extractCritical } from "@emotion/server"

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const intialProps = await Document.getInitialProps(ctx)

    const critical = extractCritical(intialProps.html)

    intialProps.html = critical.html
    intialProps.styles = (
      <>
        {intialProps.styles}
        <style
          data-emotion-css={critical.ids.join(" ")}
          dangerouslySetInnerHTML={{ __html: critical.css }}
        />
      </>
    )

    return intialProps
  }

  render() {
    return (
      <Html lang="kr">
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: (this.props as any).css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
