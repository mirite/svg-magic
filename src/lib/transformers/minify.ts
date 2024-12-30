import { traverseTreeInsideOut } from "../dom.js";

/**
 * Minifies the SVG content
 *
 * @param svgElem A reference to the SVG to minify
 */
export function minify(svgElem: SVGSVGElement): void {
	const func = (elem: Element) => {
		if (elem.nodeName === "style") return;
		const html = elem.innerHTML;
		elem.innerHTML = html.replace(/>\s+</g, "><").trim();
	};
	traverseTreeInsideOut(svgElem, (e) => func(e));
}
