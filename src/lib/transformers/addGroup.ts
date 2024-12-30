import { getSVGChildren } from "@/lib/getSVGChildren.js";
import type { IPath } from "@/lib/types.js";

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

		/**
		 * Processes a level of the tree.
		 *
		 * @param nodes The nodes to process.
		 */
		const processLevel = (nodes: IPath[]) => {
			for (const node of nodes) {
				if (selectedItems.includes(node.id)) {
					newGroup.append(node.elem);
				}
				processLevel(node.children);
			}
		};
		processLevel(rootNode);
	}
	shadowContainer.append(newGroup);
}
