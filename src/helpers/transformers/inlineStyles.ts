import { traverseTree } from '../dom';
import { parseCSS } from '../css';

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

export function inlineStyles(
	svgElem: SVGSVGElement,
	options?: IInliningOptions
): void {
	const styles = parseCSS(svgElem.querySelector('style')?.textContent || '');
	if (!styles) return;
for(const r)
	traverseTree(svgElem, func);
}

export interface IInliningOptions {}
