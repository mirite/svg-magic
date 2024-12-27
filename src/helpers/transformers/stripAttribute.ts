import { traverseTree } from "@/helpers/dom.js";

/**
 * Removes the specified attribute from an element in the SVG
 *
 * @param svgElem The element
 * @param attribute The attribute to remove.
 */
export function stripAttribute(svgElem: Element, attribute: string): void {
	const func = (elem: Element) => {
		elem.removeAttribute(attribute);
	};
	traverseTree(svgElem, func);
}
