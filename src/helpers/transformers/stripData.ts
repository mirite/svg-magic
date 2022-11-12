import { traverseTree } from 'helpers/dom';
import { IStripDataOptions } from 'types';

export function stripData(svgElem: SVGSVGElement) {
	const func = (elem: Element) => {
		for (const [key] of Object.entries((elem as HTMLElement)?.dataset)) {
			elem.removeAttribute('data-' + key);
		}
	};
	traverseTree(svgElem, func);
}
