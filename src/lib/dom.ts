import type { SVGSubElement } from "@/lib/types.js";

/**
 * Determine if two elements are equivalent
 *
 * @param a The first element
 * @param b The second element
 * @returns True if the elements are equivalent
 */
export function isEquivalentElement(
	a: HTMLElement | SVGElement,
	b: HTMLElement | SVGElement,
): boolean {
	const clean = (toClean: HTMLElement | SVGElement) => {
		const clone = toClean.cloneNode(true) as HTMLElement;
		removeActiveClass(clone);
		return clone.outerHTML;
	};
	return clean(a) === clean(b);
}

/**
 * Find the shadow equivalent of a real element
 *
 * @param realElementToFind The real element to find
 * @param shadowElement The shadow element to search in
 * @returns The shadow equivalent or null if not found
 */
export function findShadowEquivalent(
	realElementToFind: SVGSubElement,
	shadowElement: SVGSubElement,
): SVGSubElement | null {
	if (isEquivalentElement(realElementToFind, shadowElement)) {
		return shadowElement;
	}
	const children = Array.from(shadowElement.children) as SVGSubElement[];

	for (const child of children) {
		const match = findShadowEquivalent(realElementToFind, child);
		if (match) {
			return match;
		}
	}

	return null;
}

/**
 * Recursively traverse the tree and apply a function to each element
 *
 * @param elem The element to start traversing from
 * @param func The function to apply to each element
 */
export function traverseTree(
	elem: Element,
	func: (e: Element) => unknown,
): void {
	func(elem);
	for (const child of elem.children) {
		traverseTree(child, func);
	}
}

/**
 * Recursively traverse the tree and apply a function to each element, starting
 * from the inside out.
 *
 * @param elem The root element.
 * @param func The function to apply to each element.
 */
export function traverseTreeInsideOut(
	elem: Element,
	func: (e: Element) => unknown,
): void {
	for (const child of elem.children) {
		traverseTreeInsideOut(child, func);
	}
	func(elem);
}

/**
 * Remove the active class from an element
 *
 * @param elem The element to remove the active class from
 */
function removeActiveClass(elem: Element) {
	elem.classList.remove("active");
	if (!elem.classList.length) {
		elem.removeAttribute("class");
	}
}
