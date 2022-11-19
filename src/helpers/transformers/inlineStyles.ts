import { parseCSS } from '../css';
import { Rule } from 'css';

const cssPropToHtmlAttributeMap = {
	color: 'stroke',
	fill: 'fill',
	'stroke-width': 'stroke-width',
	'fill-opacity': 'stroke-opacity',
	'letter-spacing': 'letter-spacing',
	'font-family': 'font-family',
	'font-size': 'font-size',
	'font-style': 'font-style',
	'font-variant': 'font-variant',
	'font-weight': 'font-weight',
	opacity: 'opacity',
	rotate: 'rotate',
} as const;

function flattenSelector(rule: Rule) {
	if (!rule.selectors) return '';
	const combinedSelectors = rule.selectors.reduce(
		(acc, selector) => acc + selector + ', ',
		''
	);
	return combinedSelectors.slice(0, -2) || '';
}

function processRule(
	svgElem: SVGSVGElement,
	rule: Rule,
	options: IInliningOptions | undefined
) {
	if (!rule.selectors) return;
	const flattenedSelector = flattenSelector(rule);
	if (!flattenedSelector) return;
	const applicableElements = Array.from(
		svgElem.querySelectorAll(flattenedSelector)
	);
}

export function inlineStyles(
	svgElem: SVGSVGElement,
	options?: IInliningOptions
): void {
	const styles = parseCSS(svgElem.querySelector('style')?.textContent || '');
	const rules = styles?.stylesheet?.rules;
	if (!rules) return;
	for (const rule of rules) {
		if (rule.type === 'rule') {
			processRule(svgElem, rule, options);
		}
	}
}

export interface IInliningOptions {}
