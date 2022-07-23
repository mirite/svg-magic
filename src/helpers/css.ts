import {CSSContents, CSSTypes} from 'types';
import CSSParser, {Rule, StyleRules, Stylesheet} from 'css';

export function assertIsRule(
	value: CSSContents
): asserts value is CSSParser.Rule {
	if (value.type !== 'rule')
		throw new Error('Value provided is not a CSS rule');
}

export function parseCSS(stylesheetAsString: string): Stylesheet | null {
	try {
		return CSSParser.parse(stylesheetAsString);
	} catch (e) {
		return null;
	}
}

export function stylesheetToText(stylesheet: CSSTypes.Stylesheet): string {
	return CSSParser.stringify(stylesheet);
}

export function removeCSSClass(text: string, className: string): string {
	const css = parseCSS(text);
	if (!css?.stylesheet) return "";

	function processRule(rule: Rule, stylesheet: StyleRules) {
		rule.selectors = rule.selectors?.filter(s => !s.includes(className));
		if (!rule.selectors?.length) {
			stylesheet.rules = stylesheet.rules.filter(r => r !== rule);
		}
	}

	for (const rule of css.stylesheet.rules) {
		switch (rule.type) {
			case "rule":
				processRule(rule, css.stylesheet)
				break;
		}
	}
	return stylesheetToText(css);
}

export function renameCSSClass(text: string, oldClassName: string, newClassName: string): string {
	const css = parseCSS(text);
	if (!css?.stylesheet) return "";

	function processRule(rule: Rule) {
		rule.selectors = rule.selectors?.map(s => s.replace(oldClassName, newClassName));
	}

	for (const rule of css.stylesheet.rules) {
		switch (rule.type) {
			case "rule":
				processRule(rule)
				break;
		}
	}
	return stylesheetToText(css);
}
