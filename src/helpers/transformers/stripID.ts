import { traverseTree } from 'helpers/dom';
import { IStripIDOptions } from 'types';

export function stripIDs(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute('id');
	};
	traverseTree(svgElem, func);
}
