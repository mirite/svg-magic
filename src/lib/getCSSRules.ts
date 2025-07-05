import type { ISVGRule, SVGSubElement } from "@/lib/types.js";

import { stringToStylesheet } from "@/lib/css.js";

/**
 * Finds SVG rules in the style-sheet
 *
 * @param parent The element to find styles in
 * @param classes The existing rules found.
 * @returns The SVG Rules.
 */
export function getCSSRules(
	parent: SVGElement | SVGSubElement,
	classes?: ISVGRule[],
): ISVGRule[] {
	const localClasses = classes ?? [];
	const styleElem = getStyleElement(parent);

	if (styleElem && "style" === styleElem.nodeName) {
		localClasses.push(...findRules(styleElem));
	}

	return localClasses;
}

/**
 * Finds the rules in a style element
 *
 * @param styleElem The style element to find rules in
 * @returns The rules.
 */
function findRules(styleElem: HTMLStyleElement): ISVGRule[] {
	const stylesheet = stringToStylesheet(styleElem.innerHTML)!;

	return stylesheet.stylesheet!.rules.map((rule) => {
		return { rule };
	});
}

/**
 * Get the style element from the child
 *
 * @param child The child to get the style element from
 * @returns The style element or null if not found.
 */
function getStyleElement(child: SVGSubElement): HTMLStyleElement | null {
	return child.querySelector("style");
}
