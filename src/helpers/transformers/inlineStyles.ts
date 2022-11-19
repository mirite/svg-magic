import { parseCSS } from '../css';
import { Declaration, Rule } from 'css';
import { SVGSubElement } from '../../types';

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

function processElement(
	svgElem: SVGSVGElement,
	element: SVGSubElement,
	rule: Rule,
	options: IInliningOptions | undefined
) {
	if (!rule.declarations) return;
	for (const declaration of rule.declarations as Declaration[]) {
		if (
			declaration.type !== 'declaration' ||
			!declaration.property ||
			!declaration.value
		)
			continue;
		if (Object.hasOwn(cssPropToHtmlAttributeMap, declaration.property)) {
			element.setAttribute(declaration.property, declaration.value);
		}
	}
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
	) as SVGSubElement[];
	for (const element of applicableElements) {
		processElement(svgElem, element, rule, options);
	}
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
