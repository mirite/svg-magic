import { stripAttribute } from "./stripAttribute.js";

/** @param svgElem */
export function stripClasses(svgElem: Element) {
	stripAttribute(svgElem, "class");
}
