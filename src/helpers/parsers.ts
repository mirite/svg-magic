import {IPath, ISVGRule, SVGSubElement} from "../types";
import CSSParser from "css";

export function findSVGClasses(parent: SVGElement | SVGSubElement, classes?: ISVGRule[]) {

	const findRules = (styleElem: HTMLStyleElement): ISVGRule[] => {
		try {
			const stylesheet = CSSParser.parse(styleElem.innerHTML);
			return stylesheet.stylesheet?.rules.map(rule => {
				return {rule}
			}) || [];
		} catch (e) {
			console.error(e);
			return [];
		}
	};

	const processChild = (child: SVGSubElement) => {
		if ("defs" !== child.nodeName) return;

		const styleElem = child.querySelector("style") as HTMLStyleElement | null;
		if (styleElem && "style" === styleElem.nodeName) {
			localClasses.push(...findRules(styleElem))
		}

		if (child.children.length) {
			findSVGClasses(child, localClasses);
		}
	};
	const localClasses = classes ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach(processChild);
	return localClasses;
}

export function findSVGChildren(parent: SVGElement | SVGSubElement, paths?: IPath[]) {
	const localPaths = paths ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach((child, i) => {
		localPaths.push({elem: child, name: `${child.nodeName} ${i}`});
		if (child.children.length) {
			findSVGChildren(child, localPaths);
		}
	});
	return localPaths;
}
