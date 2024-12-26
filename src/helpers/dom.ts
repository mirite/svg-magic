import type React from "react";

import type { SVGSubElement } from "@/types.js";

/**
 * @param ref
 * @param content
 */
export function setTagContent(
	ref: React.MutableRefObject<HTMLElement | null>,
	content: string,
) {
	if (ref?.current) {
		ref.current.innerHTML = content;
	}
}

/**
 * @param a
 * @param b
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
 * @param realElementToFind
 * @param shadowElement
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
 * @param elem
 * @param func
 */
export function traverseTree(elem: Element, func: (e: Element) => unknown) {
	func(elem);
	for (const child of elem.children) {
		traverseTree(child, func);
	}
}

/**
 * @param elem
 * @param func
 */
export function traverseTreeInsideOut(
	elem: Element,
	func: (e: Element) => unknown,
) {
	for (const child of elem.children) {
		traverseTreeInsideOut(child, func);
	}
	func(elem);
}

/** @param elem */
function removeActiveClass(elem: Element) {
	elem.classList.remove("active");
	if (!elem.classList.length) {
		elem.removeAttribute("class");
	}
}
