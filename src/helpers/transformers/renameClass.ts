import { IClassOptions } from 'types';
import { renameCSSClass, setShadowCSS } from '../css';
import { traverseTree } from '../transformer';

export function renameClass(svgElem: SVGSVGElement, change: IClassOptions) {
	const func = (elem: Element) => {
		if (elem.classList.contains(change.options.existingClassName)) {
			elem.classList.remove(change.options.existingClassName);
			elem.classList.add(change.options.newClassName ?? '');
		}
	};
	traverseTree(svgElem, func);
	setShadowCSS(
		svgElem,
		renameCSSClass,
		change.options.existingClassName,
		change.options.newClassName
	);
}
