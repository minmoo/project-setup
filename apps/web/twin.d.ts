import "twin.macro"

import { css as cssImport } from "@emotion/react"
import styledImport from "@emotion/styled"

declare module "twin.macro" {
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module "react" {
  // css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}

// The 'as' prop on styled components
// declare global {
//   namespace JSX {
//     interface IntrinsicAttributes<T> extends DOMAttributes<T> {
//       as?: string
//     }
//   }
// }
