import { renameCSSClass, setShadowCSS } from "@/lib/css.js";
import { traverseTree } from "@/lib/dom.js";

export interface RenameClassOptions {
	existingClassName: string;
	newClassName: string;
}

/**
 * Renames a class in theSVG
 *
 * @param svgElem The SVG Element
 * @param change The change operation to perform.
 */
export function renameClass(
	svgElem: SVGSVGElement,
	change: RenameClassOptions,
): void {
	const { existingClassName, newClassName } = change;
	const func = (elem: Element) => {
		if (elem.classList.contains(existingClassName)) {
			elem.classList.remove(existingClassName);
			elem.classList.add(newClassName ?? "");
		}
	};
	traverseTree(svgElem, func);
	setShadowCSS(svgElem, renameCSSClass, existingClassName, newClassName);
}
