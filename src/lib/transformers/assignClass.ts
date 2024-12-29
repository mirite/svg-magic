import { getSVGChildren } from "@/lib/getSVGChildren.js";
import type { IPath } from "@/lib/types.js";

export interface IAssignClassOptions {
	/** The new class name. */
	className: string;
	/** The ids of the selected nodes. */
	selectedItems: number[];
}

/**
 * Assigns a class to the selected items.
 *
 * @param svgElem The SVG Element
 * @param change The change operation to perform.
 */
export function assignClass(
	svgElem: SVGSVGElement,
	change: IAssignClassOptions,
): void {
	const rootNode = getSVGChildren(svgElem);

	/**
	 * Processes a level of the tree.
	 *
	 * @param nodes The nodes to process.
	 */
	function processLevel(nodes: IPath[]) {
		for (const node of nodes) {
			if (change.selectedItems.includes(node.id)) {
				if (node.elem.classList.length) {
					node.elem.classList.add(change.className);
				} else {
					node.elem.setAttribute("class", change.className);
				}
				processLevel(node.children);
			}
		}
	}
	processLevel(rootNode);
}
