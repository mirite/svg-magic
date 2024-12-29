import { traverseTreeInsideOut } from "../dom.js";

/** @param svgElem */
export function minify(svgElem: SVGSVGElement) {
	const func = (elem: Element) => {
		if (elem.nodeName === "style") return;
		const html = elem.innerHTML;
		elem.innerHTML = html.replace(/>\s+</g, "><").trim();
	};
	traverseTreeInsideOut(svgElem, (e) => func(e));
}
