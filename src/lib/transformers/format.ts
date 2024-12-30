import { traverseTreeInsideOut } from "../dom.js";

import { minify } from "./minify.js";

/**
 * Formats the SVG
 *
 * @param svgElem A reference to the SVG to format
 */
export function format(svgElem: SVGSVGElement): void {
	minify(svgElem);
	const func = (elem: Element) => {
		if (elem.nodeName === "style") return;
		const html = elem.innerHTML;
		elem.innerHTML = html.replace(/></g, ">\n\t<").trim();
	};
	traverseTreeInsideOut(svgElem, (e) => func(e));
}
