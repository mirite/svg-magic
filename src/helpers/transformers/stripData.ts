import { traverseTree } from 'helpers/dom';

export function stripData(svgElem: SVGSVGElement) {
	const func = (elem: Element) => {
		for (const [key] of Object.entries((elem as HTMLElement)?.dataset)) {
			elem.removeAttribute('data-' + key);
		}
	};
	traverseTree(svgElem, func);
}
