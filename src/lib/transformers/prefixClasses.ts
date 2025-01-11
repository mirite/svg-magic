import { getClasses } from "@/lib/getClasses.js";

import { renameClass } from "./renameClass.js";

/**
 * Create a random prefix for the class
 *
 * @returns The generated prefix.
 */
function createPrefix(): string {
	return "svg-magic-" + Date.now().toString(36);
}

export interface IPrefixClassOptions {
	prefix?: string;
}

/**
 * Adds a prefix to the classes in the SVG. Useful to avoid conflicts when
 * in-lining.
 *
 * @param svgElem The SVG element
 * @param options The change options.
 */
export function prefixClasses(
	svgElem: SVGSVGElement,
	options?: IPrefixClassOptions,
): void {
	const classes = getClasses(svgElem);
	const prefix = options?.prefix ?? createPrefix();
	for (const existingClassName of classes) {
		const newClassName = prefix + "-" + existingClassName;
		renameClass(svgElem, {
			existingClassName,
			newClassName,
		});
	}
}
