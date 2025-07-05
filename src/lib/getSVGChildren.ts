import type { IPath, SVGSubElement } from "@/lib/types.js";

import { generateID } from "@/lib/generateID.js";

/**
 * Find the children of an SVG element
 *
 * @param parent The parent element
 * @param parentID The ID of the parent element
 * @returns The children of the parent element.
 */
export function getSVGChildren(
	parent: SVGElement | SVGSubElement,
	parentID = 0,
): IPath[] {
	const processChild = (child: SVGSubElement, index: number): IPath => {
		const name = `${child.nodeName}${child.id ? "#" + child.id : ""}${
			foldClassList(child.classList) ?? ""
		}`;
		const id = generateID(index, parentID);
		return {
			children: getSVGChildren(child, id),
			elem: child,
			id,
			name,
		};
	};

	const children = Array.from(parent.children) as SVGSubElement[];
	return children.map(processChild);
}

/**
 * Fold the class list into a string
 *
 * @param d The class list
 * @returns The class list as a string.
 */
function foldClassList(d: DOMTokenList): null | string {
	if (!d) return null;
	const classes = Array.from(d.entries());
	return classes.reduce(
		(prev, currentValue) => prev + "." + currentValue[1],
		"",
	);
}
