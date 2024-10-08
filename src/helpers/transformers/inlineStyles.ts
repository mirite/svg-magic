import type {
	AtRule,
	Declaration,
	Rule,
	Stylesheet,
	Supports,
	Comment,
} from "css";

import type { SVGSubElement } from "../../types";
import { parseCSS, setShadowCSS, stylesheetToText } from "../css";

class CSSInliner {
	private readonly rules: Array<Rule | Comment | AtRule | Supports>;
	private cssPropToHtmlAttributeMap = {
		stroke: "stroke",
		"stroke-linecap": "stroke-linecap",
		"stroke-linejoin": "stroke-linejoin",
		fill: "fill",
		"stroke-width": "stroke-width",
		"fill-opacity": "stroke-opacity",
		"letter-spacing": "letter-spacing",
		"font-family": "font-family",
		"font-size": "font-size",
		"font-style": "font-style",
		"font-variant": "font-variant",
		"font-weight": "font-weight",
		opacity: "opacity",
		rotate: "rotate",
	} as const;

	/**
	 * @param svgElem
	 * @param stylesheet
	 * @param options
	 */
	public constructor(
		private svgElem: SVGSVGElement,
		private stylesheet: Stylesheet,
		private options?: IInliningOptions,
	) {
		this.rules = this.stylesheet?.stylesheet?.rules || [];

		for (const rule of this.rules) {
			if ("type" in rule && rule.type === "rule") {
				this.processRule(rule as Rule);
			}
		}
	}

	/** @param rule */
	private processRule(rule: Rule) {
		const flattenedSelector = this.flattenSelector(rule);
		if (!rule.selectors || !flattenedSelector) return;
		const applicableElements = this.getApplicableElements(flattenedSelector);
		const removedDeclarations = new Set<Declaration>();
		for (const element of applicableElements) {
			const removed = this.processElement(element, rule);
			removed.forEach((declaration) => {
				removedDeclarations.add(declaration);
			});
		}
		this.removeInlinedDeclarations(removedDeclarations);
	}

	/** @param flattenedSelector */
	private getApplicableElements(flattenedSelector: string) {
		return Array.from(
			this.svgElem.querySelectorAll(flattenedSelector),
		) as SVGSubElement[];
	}

	/**
	 * @param element
	 * @param rule
	 */
	private processElement(element: SVGSubElement, rule: Rule) {
		const removedDeclarations: Declaration[] = [];
		if (!rule.declarations) return [];
		for (const declaration of rule.declarations as Declaration[]) {
			if (
				declaration.type !== "declaration" ||
				!declaration.property ||
				!declaration.value
			)
				continue;
			if (Object.hasOwn(this.cssPropToHtmlAttributeMap, declaration.property)) {
				element.setAttribute(declaration.property, declaration.value);
				removedDeclarations.push(declaration);
			}
		}
		return removedDeclarations;
	}

	/** @param removedDeclarations */
	private removeInlinedDeclarations(removedDeclarations: Set<Declaration>) {
		removedDeclarations.forEach((declaration) =>
			this.removeInlinedDeclaration(declaration),
		);
	}

	/** @param declaration */
	private removeInlinedDeclaration(declaration: Declaration) {
		const removeRule = () => {
			const parent = declaration.parent as Rule;
			parent.declarations =
				parent.declarations?.filter(
					(d) => (d as Declaration).property !== declaration.property,
				) || [];
			return stylesheetToText(this.stylesheet).trim();
		};
		setShadowCSS(this.svgElem, removeRule);
	}

	/** @param rule */
	private flattenSelector(rule: Rule) {
		if (!rule.selectors) return "";
		const combinedSelectors = rule.selectors.reduce(
			(acc, selector) => acc + selector + ", ",
			"",
		);
		return combinedSelectors.slice(0, -2) || "";
	}
}

/**
 * @param svgElem
 * @param options
 */
export function inlineStyles(
	svgElem: SVGSVGElement,
	options?: IInliningOptions,
): void {
	const styles = parseCSS(svgElem.querySelector("style")?.textContent || "");
	if (!styles) return;
	new CSSInliner(svgElem, styles, options);
}

export type IInliningOptions = object;
