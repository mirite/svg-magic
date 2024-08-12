import { stripAttribute } from "./stripAttribute";

/** @param svgElem */
export function stripClasses(svgElem: Element) {
	stripAttribute(svgElem, "class");
}
