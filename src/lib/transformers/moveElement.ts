import type { SVGSubElement } from "@/lib/types.js";

import { getSVGChildren } from "@/lib/getSVGChildren.js";

import { traverseTree } from "../dom.js";

export interface IMoveOptions {
	element: number;
	target: number;
}

/**
 * Moves an element in the tree.
 *
 * @param svgElement A reference to the SVG for manipulation.
 * @param change The change options.
 */
export function moveElement(
	svgElement: SVGElement,
	change: IMoveOptions,
): void {
	const rootNode = getSVGChildren(svgElement);
	let targetEquiv: null | SVGSubElement = null;
	let elementEquiv: null | SVGSubElement = null;

	traverseTree(rootNode, ({ elem, id }) => {
		if (change.target === id) {
			targetEquiv = elem;
		} else if (change.element === id) {
			elementEquiv = elem;
		}
	});

	if (targetEquiv && elementEquiv) {
		(targetEquiv as SVGSubElement).append(elementEquiv);
	}
}
