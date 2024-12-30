import { traverseTree } from "@/lib/dom.js";
import { getSVGChildren } from "@/lib/getSVGChildren.js";

export interface IGroupOptions {
	className?: string;
	selectedItems?: number[];
}

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
		const rootNode = getSVGChildren(shadowContainer);
		traverseTree(rootNode, (elem) => {
			if (selectedItems.includes(elem.id)) {
				newGroup.append(elem.elem);
			}
		});
	}
	shadowContainer.append(newGroup);
}
