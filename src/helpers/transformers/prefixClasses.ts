import { IPrefixClassOptions } from 'types';
import { findClasses } from '../parsers';
import { renameClass } from './renameClass';

function createPrefix(): string {
	return 'svg-magic-' + Date.now().toString(36);
}

export function prefixClasses(
	svgElem: SVGSVGElement,
	options?: IPrefixClassOptions
) {
	const classes = findClasses(svgElem);
	const prefix = options?.options?.prefix ?? createPrefix();
	for (const existingClassName of classes) {
		const newClassName = prefix + '-' + existingClassName;
		renameClass(svgElem, {
			options: {
				existingClassName,
				newClassName,
			},
		});
	}
}
