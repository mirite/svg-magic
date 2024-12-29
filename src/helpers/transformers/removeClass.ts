import { removeCSSClass, setShadowCSS } from "@/helpers/css.js";
import { traverseTree } from "@/helpers/dom.js";

export type RemoveClassOptions = {
	existingClassName: string;
};
/**
 * Removes a class from the svg.
 *
 * @param svgElem The SVG Element
 * @param change The change operation.
 */
export function removeClass(
	svgElem: SVGSVGElement,
	change: RemoveClassOptions,
): void {
	const func = (elem: Element) => {
		elem.classList.remove(change.existingClassName);
	};
	traverseTree(svgElem, func);
	setShadowCSS(svgElem, removeCSSClass, change.existingClassName);
}
