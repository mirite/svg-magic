import { stripAttribute } from "./stripAttribute";

export function stripClasses(svgElem: Element) {
  stripAttribute(svgElem, "class");
}
