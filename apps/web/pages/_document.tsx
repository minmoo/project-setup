import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document"
import { extractCritical } from "@emotion/server"
import createEmotionServer from "@emotion/server/create-instance"
import { cache } from "@emotion/css"
import React from "react"

const renderStatic = async (html: string) => {
  if (html === undefined) {
    throw new Error("did you forget to return html from renderToString?")
  }

  const { extractCritical } = createEmotionServer(cache)
  const { ids, css } = extractCritical(html)

  return { html, ids, css }
}

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const intialProps = await Document.getInitialProps(ctx)

    return {
      ...intialProps,
      styles: (
        <React.Fragment>
          {intialProps.styles}
          <style
            data-emotion={`css ${ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </React.Fragment>
      ),
    }
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
