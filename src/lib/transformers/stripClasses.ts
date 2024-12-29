import { stripAttribute } from "./stripAttribute.js";

/**
 * Removes the class attribute from the elements in the SVG
 *
 * @param svgElem The SVG Element
 */
export function stripClasses(svgElem: Element): void {
	stripAttribute(svgElem, "class");
}
