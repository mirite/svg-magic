import type { Rule, StyleRules, Stylesheet } from "css";
import CSSParser from "css";

import type { CSSContents, CSSTypes } from "@/lib/types.js";

/**
 * Type guard for CSSParser Rule
 *
 * @param value The value to check
 * @returns Whether the value is a CSSParser Rule
 */
export function isRule(value: CSSContents): value is CSSParser.Rule {
	return value.type === "rule";
}

/**
 * Parse a stylesheet string into a stylesheet object
 *
 * @param stylesheetAsString The stylesheet as a string
 * @returns The parsed stylesheet or null if parsing failed.
 */
export function stringToStylesheet(
	stylesheetAsString: string,
): Stylesheet | null {
	try {
		return CSSParser.parse(stylesheetAsString);
	} catch (e: unknown) {
		console.error(e);
		return null;
	}
}

/**
 * Convert a stylesheet object into a string
 *
 * @param stylesheet The stylesheet object
 * @returns The stylesheet as a string.
 */
export function stylesheetToString(stylesheet: CSSTypes.Stylesheet): string {
	return CSSParser.stringify(stylesheet);
}

/**
 * Removes a CSS class from a stylesheet
 *
 * @param text The stylesheet as a string
 * @param className The class name to remove
 * @returns The stylesheet with the class removed
 */
export function removeCSSClass(text: string, className: string): string {
	const css = stringToStylesheet(text);
	if (!css?.stylesheet) return "";

	/**
	 * Process a rule to remove the class
	 *
	 * @param rule The rule to process
	 * @param stylesheet The stylesheet to remove the rule from
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
	return stylesheetToString(css);
}

/**
 * Renames a CSS class in a stylesheet
 *
 * @param text The stylesheet as a string
 * @param oldClassName The class name to replace
 * @param newClassName The new class name
 * @returns The stylesheet with the class name replaced
 */
export function renameCSSClass(
	text: string,
	oldClassName: string,
	newClassName: string,
): string {
	const css = stringToStylesheet(text);
	if (!css?.stylesheet) return "";

	const pattern = new RegExp(`(.)${oldClassName}([. ,\\n{]|$)`, "ig");

	/**
	 * Process a rule to rename the class
	 *
	 * @param rule The rule to process
	 */
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
	return stylesheetToString(css);
}

/**
 * Sets the content of a style tag
 *
 * @template T The type of the function
 * @param svgElem The SVG element to set the style tag content for
 * @param func The function to set the content with
 * @param argsToPassOn The arguments to pass to the function
 */
export function setShadowCSS<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (text: string, ...args: any[]) => string,
>(
	svgElem: Element,
	func: T,
	...argsToPassOn: Parameters<T> extends [infer _, ...infer Rest] ? Rest : never
): void {
	const style = svgElem.querySelector("style");
	if (!style) return;
	style.innerHTML = func(style.innerHTML, ...argsToPassOn);
}
