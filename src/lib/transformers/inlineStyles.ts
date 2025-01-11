import type {
	AtRule,
	Declaration,
	Rule,
	Stylesheet,
	Supports,
	Comment,
} from "css";

import type { SVGSubElement } from "@/lib/types.js";

import {
	stringToStylesheet,
	setShadowCSS,
	stylesheetToString,
} from "../css.js";


/**
 * A class that allows for CSS rules to be reassigned as attributes on the SVG
 * elements.
 */
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
	 * Creates a new CSSInliner
	 *
	 * @param svgElem The active SVG element
	 * @param stylesheet The active styllesheet
	 * @param options Options for the inliner.
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

	/**
	 * Translate an individual CSS rule to an attribute on the SVG
	 *
	 * @param rule The rule to translate
	 */
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

	/**
	 * Finds the elements that the selector affects.
	 *
	 * @param flattenedSelector The selector
	 * @returns The elements selected.
	 */
	private getApplicableElements(flattenedSelector: string) {
		return Array.from(
			this.svgElem.querySelectorAll(flattenedSelector),
		) as SVGSubElement[];
	}

	/**
	 * Processes an element in the SVG with the provided rule.
	 *
	 * @param element The element to process
	 * @param rule The rule to apply.
	 * @returns The declarations that affected the element.
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

	/**
	 * Removed the declarations from the stylesheet that were inlined.
	 *
	 * @param removedDeclarations The declarations that were inlined.
	 */
	private removeInlinedDeclarations(removedDeclarations: Set<Declaration>) {
		removedDeclarations.forEach((declaration) =>
			this.removeInlinedDeclaration(declaration),
		);
	}

	/**
	 * Removes a declaration from the stylesheet that has been inlined.
	 *
	 * @param declaration The declaration to remove.
	 */
	private removeInlinedDeclaration(declaration: Declaration) {
		const removeRule = (_: string) => {
			const parent = declaration.parent as Rule;
			parent.declarations =
				parent.declarations?.filter(
					(d) => (d as Declaration).property !== declaration.property,
				) || [];
			return stylesheetToString(this.stylesheet).trim();
		};
		setShadowCSS(this.svgElem, removeRule);
	}

	/**
	 * Converts a selector array from the parsed CSS to a string representation.
	 *
	 * @param rule The rule to get a string selector for.
	 * @returns The selector.
	 */
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
 * Inlines the styles for the SVG
 *
 * @param svgElem The element to inline the styles for.
 * @param options The options for inlining.
 */
export function inlineStyles(
	svgElem: SVGSVGElement,
	options?: IInliningOptions,
): void {
	const styles = stringToStylesheet(
		svgElem.querySelector("style")?.textContent || "",
	);
	if (!styles) return;
	new CSSInliner(svgElem, styles, options);
}

export type IInliningOptions = object;
