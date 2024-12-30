import { findShadowEquivalent } from "../dom.js";

import type { IMoveOptions } from "@/lib/types.js";

/**
 * Moves an element in the tree.
 *
 * @param shadowContainer A reference to the SVG for manipulation.
 * @param change The change options.
 */
export function moveElement(
	shadowContainer: SVGElement,
	change: IMoveOptions,
): void {
	const { target, element } = change;
	const targetEquiv = findShadowEquivalent(target, shadowContainer);
	const elementEquiv = findShadowEquivalent(element, shadowContainer);
	if (targetEquiv && elementEquiv) {
		targetEquiv.append(elementEquiv);
	}
}
