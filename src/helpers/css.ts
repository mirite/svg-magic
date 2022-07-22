import { CSSContents, CSSTypes } from '../types';
import CSSParser, { Stylesheet } from 'css';

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
