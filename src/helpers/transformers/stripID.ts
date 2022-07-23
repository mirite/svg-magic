import { traverseTree } from 'helpers/dom';
import { IStripIDOptions } from 'types';

export function stripIDFromSVG(svgElem: Element) {
	const func = (elem: Element) => {
		elem.removeAttribute('id');
	};
	traverseTree(svgElem, func);
}

export const stripIDs: IStripIDOptions = {
	type: 'strip',
};
