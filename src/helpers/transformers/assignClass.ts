import type { IAssignClassOptions } from "types";

import { findShadowEquivalent } from "../dom";

/**
 * @param svgElem
 * @param change
 */
export function assignClass(
	svgElem: SVGSVGElement,
	change: IAssignClassOptions,
) {
	for (const path of change.selectedItems) {
		const shadow = findShadowEquivalent(path.elem, svgElem);
		if (shadow) {
			if (shadow.classList.length) {
				shadow.classList.add(change.className);
			} else {
				shadow.setAttribute("class", change.className);
			}
		}
	}
}
