import { stripAttribute } from "./stripAttribute.js";

/**
 * Removes the ID attributes from elements in the SVG
 *
 * @param svgElem The SVG Element
 */
export function stripIDs(svgElem: Element): void {
	stripAttribute(svgElem, "id");
}
