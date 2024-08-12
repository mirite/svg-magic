import type { Rule, StyleRules, Stylesheet } from "css";
import CSSParser from "css";
import type { CSSContents, CSSTypes } from "types";

/** @param value */
export function assertIsRule(
	value: CSSContents,
): asserts value is CSSParser.Rule {
	if (value.type !== "rule")
		throw new Error("Value provided is not a CSS rule");
}

/** @param stylesheetAsString */
export function parseCSS(stylesheetAsString: string): Stylesheet | null {
	try {
		return CSSParser.parse(stylesheetAsString);
	} catch (e) {
		return null;
	}
}

/** @param stylesheet */
export function stylesheetToText(stylesheet: CSSTypes.Stylesheet): string {
	return CSSParser.stringify(stylesheet);
}

/**
 * @param text
 * @param className
 */
export function removeCSSClass(text: string, className: string): string {
	const css = parseCSS(text);
	if (!css?.stylesheet) return "";

	/**
	 * @param rule
	 * @param stylesheet
	 */
	function processRule(rule: Rule, stylesheet: StyleRules) {
		rule.selectors = rule.selectors?.filter((s) => !s.includes(className));
		if (!rule.selectors?.length) {
			stylesheet.rules = stylesheet.rules.filter((r) => r !== rule);
		}
	}

	for (const rule of css.stylesheet.rules) {
		switch (rule.type) {
			case "rule":
				processRule(rule, css.stylesheet);
				break;
		}
	}
	return stylesheetToText(css);
}

/**
 * @param text
 * @param oldClassName
 * @param newClassName
 */
export function renameCSSClass(
	text: string,
	oldClassName: string,
	newClassName: string,
): string {
	const css = parseCSS(text);
	if (!css?.stylesheet) return "";

	const pattern = new RegExp(`(.)${oldClassName}([. ,\\n{]|$)`, "ig");

	/** @param rule */
	function processRule(rule: Rule) {
		rule.selectors = rule.selectors?.map((s) => {
			return s.replace(pattern, "$1" + newClassName + "$2");
		});
	}

	for (const rule of css.stylesheet.rules) {
		switch (rule.type) {
			case "rule":
				processRule(rule);
				break;
		}
	}
	return stylesheetToText(css);
}

/**
 * @param svgElem
 * @param func
 * @param argsToPassOn
 */
export function setShadowCSS(
	svgElem: Element,
	func: (text: string, ...args: any[]) => string,
	...argsToPassOn: unknown[]
) {
	const style = svgElem.querySelector("style");
	if (!style) return;
	style.innerHTML = func(style.innerHTML, ...argsToPassOn);
}
