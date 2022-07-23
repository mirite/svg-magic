import { traverseTree } from '../transformer';

export function stripDataFromSVG(svgElem: SVGSVGElement) {
	const func = (elem: Element) => {
		for (const [key, value] of Object.entries(
			(elem as HTMLElement)?.dataset
		)) {
			elem.removeAttribute('data-' + key);
		}
	};
	traverseTree(svgElem, func);
}
