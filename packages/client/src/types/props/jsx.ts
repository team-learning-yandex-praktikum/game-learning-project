export type JsxTag = keyof JSX.IntrinsicElements
export type JsxElementAttributes<Element extends JsxTag = 'div'> =
  JSX.IntrinsicElements[Element]
