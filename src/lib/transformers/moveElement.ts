import { findShadowEquivalent } from "../dom.js";

import type { IMoveOptions } from "@/lib/types.js";

/**
 * @param shadowContainer
 * @param change
 */
export function moveElement(shadowContainer: SVGElement, change: IMoveOptions) {
	const { target, element } = change;
	const targetEquiv = findShadowEquivalent(target, shadowContainer);
	const elementEquiv = findShadowEquivalent(element, shadowContainer);
	if (targetEquiv && elementEquiv) {
		targetEquiv.append(elementEquiv);
	}
}
