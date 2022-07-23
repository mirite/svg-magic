import { traverseTree } from '../transformer';

export function stripIDFromSVG(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute('id');
	};
	traverseTree(svgElem, func);
}
