import { traverseTree } from 'helpers/dom';

export function stripIDs(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute('id');
	};
	traverseTree(svgElem, func);
}
