import { parseCSS } from '../css';
import { AtRule, Declaration, Rule, Stylesheet } from 'css';
import { SVGSubElement } from '../../types';

class CSSInliner {
	private readonly rules: Array<Rule | Comment | AtRule>;
	public constructor(
		private svgElem: SVGSVGElement,
		private stylesheet: Stylesheet,
		private options?: IInliningOptions
	) {
		this.rules = this.stylesheet?.stylesheet?.rules || [];

		for (const rule of this.rules) {
			if ('type' in rule && rule.type === 'rule') {
				this.processRule(rule as Rule);
			}
		}
	}

	private cssPropToHtmlAttributeMap = {
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

	private flattenSelector(rule: Rule) {
		if (!rule.selectors) return '';
		const combinedSelectors = rule.selectors.reduce(
			(acc, selector) => acc + selector + ', ',
			''
		);
		return combinedSelectors.slice(0, -2) || '';
	}

	private processElement(element: SVGSubElement, rule: Rule) {
		if (!rule.declarations) return;
		for (const declaration of rule.declarations as Declaration[]) {
			if (
				declaration.type !== 'declaration' ||
				!declaration.property ||
				!declaration.value
			)
				continue;
			if (
				Object.hasOwn(
					this.cssPropToHtmlAttributeMap,
					declaration.property
				)
			) {
				element.setAttribute(declaration.property, declaration.value);
			}
		}
	}

	private processRule(rule: Rule) {
		if (!rule.selectors) return;
		const flattenedSelector = this.flattenSelector(rule);
		if (!flattenedSelector) return;
		const applicableElements = Array.from(
			this.svgElem.querySelectorAll(flattenedSelector)
		) as SVGSubElement[];
		for (const element of applicableElements) {
			this.processElement(element, rule);
		}
	}
}

export function inlineStyles(
	svgElem: SVGSVGElement,
	options?: IInliningOptions
): void {
	const styles = parseCSS(svgElem.querySelector('style')?.textContent || '');
	if (!styles) return;
	new CSSInliner(svgElem, styles, options);
}

export interface IInliningOptions {}
