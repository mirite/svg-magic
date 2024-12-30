import { findShadowEquivalent } from "../dom.js";
import type { IGroupOptions } from "../types.js";

/**
 * Adds a <g> to the SVG
 *
 * @param shadowContainer The SVG to add the group to.
 * @param change The options for adding a group.
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
