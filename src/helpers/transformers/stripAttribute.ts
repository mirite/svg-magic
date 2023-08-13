import { traverseTree } from "helpers/dom";

export function stripAttribute(svgElem: Element, attribute: string) {
  const func = (elem: Element) => {
    elem.removeAttribute(attribute);
  };
  traverseTree(svgElem, func);
}
