import { minify } from "./minify";
import { traverseTreeInsideOut } from "../dom";

export function format(svgElem: SVGSVGElement) {
  minify(svgElem);
  const func = (elem: Element) => {
    if (elem.nodeName === "style") return;
    const html = elem.innerHTML;
    elem.innerHTML = html.replace(/></g, ">\n\t<").trim();
  };
  traverseTreeInsideOut(svgElem, (e) => func(e));
}
