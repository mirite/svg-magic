import { IAssignClassOptions } from 'types';
import { findShadowEquivalent } from '../dom';

export function assignClass(
	svgElem: SVGSVGElement,
	change: IAssignClassOptions
) {
	for (const path of change.options.selectedItems) {
		const shadow = findShadowEquivalent(path.elem, svgElem);
		if (shadow) {
			shadow.classList.add(change.options.className);
		}
	}
}
