import { traverseTree } from "../dom.js";

import { getSVGChildren } from "@/lib/getSVGChildren.js";
import type { SVGSubElement } from "@/lib/types.js";

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
	let targetEquiv: SVGSubElement | null = null;
	let elementEquiv: SVGSubElement | null = null;

	traverseTree(rootNode, ({ elem, id }) => {
		if (change.target === id) {
			targetEquiv = elem;
		} else if (change.element === id) {
			elementEquiv = elem;
		}
	});

	if (targetEquiv && elementEquiv) {
		// @ts-expect-error TS2339 TypeScript doesn't recognize that these can be set in the traverseTree callback.
		targetEquiv.append(elementEquiv);
	}
}
