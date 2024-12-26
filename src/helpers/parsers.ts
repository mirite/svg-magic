import { parseCSS } from "./css.js";

import type {
	IPath,
	IPoint,
	ISVGRule,
	SVGSubElement,
	FileState,
} from "@/types.js";

/**
 * Finds SVG rules in the stlyesheet
 *
 * @param parent The element to find styles in
 * @param classes
 */
function findSVGRules(
	parent: SVGElement | SVGSubElement,
	classes?: ISVGRule[],
) {
	const findRules = (styleElem: HTMLStyleElement): ISVGRule[] => {
		const stylesheet = parseCSS(styleElem.innerHTML);

		return (
			stylesheet?.stylesheet?.rules.map((rule) => {
				return { rule };
			}) || []
		);
	};

	/** @param child */
	function getStyleElement(child: SVGSubElement): HTMLStyleElement | null {
		return (("style" === child.nodeName && child) ||
			child.querySelector("style")) as HTMLStyleElement | null;
	}

	const processChild = (child: SVGSubElement) => {
		if ("defs" !== child.nodeName && "style" !== child.nodeName) {
			return;
		}
		const styleElem = getStyleElement(child);

		if (styleElem && "style" === styleElem.nodeName) {
			localClasses.push(...findRules(styleElem));
		}

		if (child.children.length) {
			findSVGRules(child, localClasses);
		}
	};
	const localClasses = classes ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach(processChild);
	return localClasses;
}

/** @param d */
function foldClassList(d: DOMTokenList): string | null {
	if (!d) return null;
	const classes = Array.from(d.entries());
	return classes.reduce(
		(prev, currentValue) => prev + "." + currentValue[1],
		"",
	);
}

/** @param parent */
function findSVGChildren(parent: SVGElement | SVGSubElement): IPath[] {
	const processChild = (child: SVGSubElement): IPath => {
		const name = `${child.nodeName}${child.id ? "#" + child.id : ""}${
			foldClassList(child.classList) ?? ""
		}`;
		return {
			elem: child,
			name,
			children: findSVGChildren(child),
		};
	};

	const children = Array.from(parent.children) as SVGSubElement[];
	return children.map(processChild);
}

/**
 * @param element
 * @param existing
 */
export function findClasses(
	element: Element,
	existing?: Set<string>,
): string[] {
	const localExistingRef = existing ?? new Set<string>();
	for (const c of element.classList) {
		localExistingRef.add(c);
	}
	for (const child of element.children) {
		findClasses(child, localExistingRef);
	}
	return Array.from(localExistingRef);
}

/**
 * @param element
 * @param existing
 */
function findSVGPoints(
	element: SVGSubElement,
	existing?: Set<IPoint>,
): IPoint[] {
	const localExistingRef = existing ?? new Set<IPoint>();
	for (const c of element.getAttributeNames()) {
		if (c.startsWith("x")) {
			const portion = c.substring(1);
			const x = Number.parseFloat(element.getAttribute("x" + portion) || "0");
			const y = Number.parseFloat(element.getAttribute("y" + portion) || "0");
			if ((x || x === 0) && (y || y === 0)) {
				localExistingRef.add({ x, y, owner: element });
			}
		} else if (c === "points") {
			const pointsList = element.getAttribute("points") || "";
			const values = pointsList.split(/[, ]+/g);
			for (let i = 0; i < values.length; i += 2) {
				const x = Number.parseFloat(values[i]);
				const y = Number.parseFloat(values[i + 1]);
				localExistingRef.add({ x, y, owner: element });
			}
		}
	}
	for (const child of element.children) {
		findSVGPoints(child as SVGSubElement, localExistingRef);
	}
	return Array.from(localExistingRef);
}

/**
 * Finds the componenents on an SVG
 *
 * @param svgContainer The container of the SVG.
 * @returns The components of the SVG.
 */
export function evaluateSVG(
	svgContainer: HTMLDivElement | null,
): Pick<FileState, "paths" | "rules" | "classes" | "points"> | null {
	if (!svgContainer) return null;
	const svgElem = svgContainer.firstChild as SVGElement;
	if (!svgElem) return null;
	const paths: IPath[] = findSVGChildren(svgElem);
	const rules: ISVGRule[] = findSVGRules(svgElem);
	const points: IPoint[] = findSVGPoints(svgElem);
	const classes = findClasses(svgElem);
	return { paths, rules, classes, points };
}
