import type { ISVGRule, SVGSubElement } from "@/types.js";
import { parseCSS } from "@/helpers/css.js";

/**
 * Finds SVG rules in the style-sheet
 *
 * @param parent The element to find styles in
 * @param classes The existing rules found.
 * @returns The SVG Rules.
 */
export function getSVGRules(
	parent: SVGElement | SVGSubElement,
	classes?: ISVGRule[],
): ISVGRule[] {
	const findRules = (styleElem: HTMLStyleElement): ISVGRule[] => {
		const stylesheet = parseCSS(styleElem.innerHTML);

		return (
			stylesheet?.stylesheet?.rules.map((rule, index) => {
				return { rule, id: `${JSON.stringify(rule)}-${index}` };
			}) || []
		);
	};

	/**
	 * Get the style element from the child
	 *
	 * @param child The child to get the style element from
	 * @returns The style element or null if not found.
	 */
	function getStyleElement(child: SVGSubElement): HTMLStyleElement | null {
		return (("style" === child.nodeName && child) ||
			child.querySelector("style")) as HTMLStyleElement | null;
	}

	const processChild = (child: SVGSubElement) => {
		if ("defs" !== child.nodeName && "style" !== child.nodeName) {
			return;
		}
		const styleElem = getStyleElement(child);
		console.log({ styleElem });
		if (styleElem && "style" === styleElem.nodeName) {
			localClasses.push(...findRules(styleElem));
		}

		if (child.children.length) {
			getSVGRules(child, localClasses);
		}
	};
	const localClasses = classes ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach(processChild);
	return localClasses;
}
