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
 * @returns The children of the parent element.
 */
export function getSVGChildren(parent: SVGElement | SVGSubElement): IPath[] {
	const processChild = (child: SVGSubElement): IPath => {
		const name = `${child.nodeName}${child.id ? "#" + child.id : ""}${
			foldClassList(child.classList) ?? ""
		}`;
		return {
			elem: child,
			name,
			children: getSVGChildren(child),
		};
	};

	const children = Array.from(parent.children) as SVGSubElement[];
	return children.map(processChild);
}
