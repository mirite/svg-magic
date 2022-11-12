import { IPrefixClassOptions } from 'types';
import { findClasses } from '../parsers';
import { renameClass } from './renameClass';

function createPrefix(): string {
	return 'svg-magic-' + Date.now().toString(36);
}

export function prefixClassesInSVG(
	svgElem: SVGSVGElement,
	options?: IPrefixClassOptions
) {
	const classes = findClasses(svgElem);
	const prefix = options?.options?.prefix ?? createPrefix();
	for (const existingClassName of classes) {
		const newClassName = prefix + '-' + existingClassName;
		renameClass(svgElem, {
			type: 'renameClass',
			options: {
				existingClassName,
				newClassName,
			},
		});
	}
}

export const prefixClasses: IPrefixClassOptions = {
	type: 'prefixClasses',
};
