import { IClassOptions } from "types";
import { removeCSSClass, setShadowCSS } from "helpers/css";
import { traverseTree } from "helpers/dom";

export function removeClass(svgElem: SVGSVGElement, change: IClassOptions) {
  const func = (elem: Element) => {
    elem.classList.remove(change.existingClassName);
  };
  traverseTree(svgElem, func);
  setShadowCSS(svgElem, removeCSSClass, change.existingClassName);
}
