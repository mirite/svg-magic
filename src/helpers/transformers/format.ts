import { traverseTreeInsideOut } from "../dom";

import { minify } from "./minify";

/** @param svgElem */
export function format(svgElem: SVGSVGElement) {
	minify(svgElem);
	const func = (elem: Element) => {
		if (elem.nodeName === "style") return;
		const html = elem.innerHTML;
		elem.innerHTML = html.replace(/></g, ">\n\t<").trim();
	};
	traverseTreeInsideOut(svgElem, (e) => func(e));
}
