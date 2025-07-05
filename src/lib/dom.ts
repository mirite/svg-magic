import type { IPath, SVGSubElement } from "@/lib/types.js";

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
): null | SVGSubElement {
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
 * Recursively traverse the tree and apply a function to each element
 *
 * @template T The type of the element
 * @param elem The element to start traversing from
 * @param func The function to apply to each element
 */
export function traverseTree<T extends Element | IPath>(
	elem: T | T[],
	func: (e: T) => unknown,
): void {
	const iterable = Array.isArray(elem) ? elem : [elem];
	for (const item of iterable) {
		func(item);
		for (const child of item.children) {
			traverseTree(child as T, func);
		}
	}
}

/**
 * Recursively traverse the tree and apply a function to each element, starting
 * from the inside out.
 *
 * @template T The type of the element.
 * @param elem The root element.
 * @param func The function to apply to each element.
 */
export function traverseTreeInsideOut<T extends Element | IPath>(
	elem: T | T[],
	func: (e: T) => unknown,
): void {
	const iterable = Array.isArray(elem) ? elem : [elem];
	for (const item of iterable) {
		for (const child of item.children) {
			traverseTreeInsideOut(child as T, func);
		}
		func(item);
	}
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
