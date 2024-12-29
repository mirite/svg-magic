import type { IGroupOptions } from "../types.js";
import { findShadowEquivalent } from "../dom.js";

/**
 * @param shadowContainer
 * @param change
 */
export function addGroup(
	shadowContainer: SVGElement,
	change: IGroupOptions,
): void {
	const { className, selectedItems } = change;
	const newGroup = document.createElement("g");
	newGroup.className = className || "";
	if (selectedItems) {
		for (const path of selectedItems) {
			const elementEquiv = findShadowEquivalent(path.elem, shadowContainer);
			if (elementEquiv) {
				newGroup.append(elementEquiv);
			}
		}
	}
	shadowContainer.append(newGroup);
}
