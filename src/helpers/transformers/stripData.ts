import { traverseTree } from "@/helpers/dom.js";

/**
 * Removes the data attributes from HTML elements
 *
 * @param svgElem The SVG element.
 */
export function stripData(svgElem: SVGSVGElement): void {
	const func = (elem: Element) => {
		for (const [key] of Object.entries((elem as HTMLElement)?.dataset)) {
			elem.removeAttribute("data-" + key);
		}
	};
	traverseTree(svgElem, func);
}
