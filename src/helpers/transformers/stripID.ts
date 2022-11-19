import { stripAttribute } from './stripAttribute';

export function stripIDs(svgElem: Element) {
	stripAttribute(svgElem, 'id');
}
