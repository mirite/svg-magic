import { traverseTree } from "@/helpers/dom.js";

/** @param svgElem */
export function stripData(svgElem: SVGSVGElement): void {
	const func = (elem: Element) => {
		for (const [key] of Object.entries((elem as HTMLElement)?.dataset)) {
			elem.removeAttribute("data-" + key);
		}
	};
	traverseTree(svgElem, func);
}
