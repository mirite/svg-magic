import { traverseTree } from 'helpers/dom';

export function stripClasses(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute('class');
	};
	traverseTree(svgElem, func);
}
