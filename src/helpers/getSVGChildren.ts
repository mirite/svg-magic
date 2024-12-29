import type { IPath, SVGSubElement } from "@/types.js";

/**
 * Fold the class list into a string
 *
 * @param d The class list
 * @returns The class list as a string.
 */
function foldClassList(d: DOMTokenList): string | null {
	if (!d) return null;
	const classes = Array.from(d.entries());
	return classes.reduce(
		(prev, currentValue) => prev + "." + currentValue[1],
		"",
	);
}

/**
 * Find the children of an SVG element
 *
 * @param parent The parent element
 * @param level
 * @returns The children of the parent element.
 */
export function getSVGChildren(
	parent: SVGElement | SVGSubElement,
	level = 0,
): IPath[] {
	const processChild = (child: SVGSubElement, index: number): IPath => {
		const name = `${child.nodeName}${child.id ? "#" + child.id : ""}${
			foldClassList(child.classList) ?? ""
		}`;
		return {
			elem: child,
			name,
			children: getSVGChildren(child, level + 1),
			id: index + Math.pow(10, level) * 100,
		};
	};

	const children = Array.from(parent.children) as SVGSubElement[];
	return children.map(processChild);
}
