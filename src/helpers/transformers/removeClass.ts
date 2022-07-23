import { IClassOptions } from 'types';
import { removeCSSClass, setShadowCSS } from '../css';
import { traverseTree } from '../transformer';

export function removeClass(svgElem: SVGSVGElement, change: IClassOptions) {
	const func = (elem: Element) => {
		elem.classList.remove(change.options.existingClassName);
	};
	traverseTree(svgElem, func);
	setShadowCSS(svgElem, removeCSSClass, change.options.existingClassName);
}
