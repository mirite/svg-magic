import { IClassOptions } from "types";
import { renameCSSClass, setShadowCSS } from "helpers/css";
import { traverseTree } from "helpers/dom";

export function renameClass(svgElem: SVGSVGElement, change: IClassOptions) {
  const { existingClassName, newClassName } = change;
  const func = (elem: Element) => {
    if (elem.classList.contains(existingClassName)) {
      elem.classList.remove(existingClassName);
      elem.classList.add(newClassName ?? "");
    }
  };
  traverseTree(svgElem, func);
  setShadowCSS(svgElem, renameCSSClass, existingClassName, newClassName);
}
