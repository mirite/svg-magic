import { traverseTree } from "helpers/dom";

/**
 * @param svgElem
 * @param attribute
 */
export function stripAttribute(svgElem: Element, attribute: string) {
	const func = (elem: Element) => {
		elem.removeAttribute(attribute);
	};
	traverseTree(svgElem, func);
}
