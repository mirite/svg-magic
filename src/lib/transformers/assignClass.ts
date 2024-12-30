import { traverseTree } from "@/lib/dom.js";
import { getSVGChildren } from "@/lib/getSVGChildren.js";

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
	traverseTree(rootNode, ({ elem, id }) => {
		if (change.selectedItems.includes(id)) {
			if (elem.classList.length) {
				elem.classList.add(change.className);
			} else {
				elem.setAttribute("class", change.className);
			}
		}
	});
}
