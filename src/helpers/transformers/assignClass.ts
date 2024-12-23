import type { IAssignClassOptions } from "@/types.js";

import { findShadowEquivalent } from "../dom.js";

/**
 * @param svgElem
 * @param change
 */
export function assignClass(
	svgElem: SVGSVGElement,
	change: IAssignClassOptions,
): void {
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
