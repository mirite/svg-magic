import { IPath, ISVGRule, SVGSubElement } from 'types';
import { parseCSS } from './css';

export function findSVGClasses(
	parent: SVGElement | SVGSubElement,
	classes?: ISVGRule[]
) {
	const findRules = (styleElem: HTMLStyleElement): ISVGRule[] => {
		const stylesheet = parseCSS(styleElem.innerHTML);

		return (
			stylesheet?.stylesheet?.rules.map((rule) => {
				return { rule };
			}) || []
		);
	};

	const processChild = (child: SVGSubElement) => {
		if ('defs' !== child.nodeName) {
			return;
		}

		const styleElem = child.querySelector(
			'style'
		) as HTMLStyleElement | null;
		if (styleElem && 'style' === styleElem.nodeName) {
			localClasses.push(...findRules(styleElem));
		}

		if (child.children.length) {
			findSVGClasses(child, localClasses);
		}
	};
	const localClasses = classes ?? [];
	const children = Array.from(parent.children) as SVGSubElement[];
	children.forEach(processChild);
	return localClasses;
}

export function findSVGChildren(
	parent: SVGElement | SVGSubElement,
	parentIndex?: string
): IPath[] {
	const processChild = (child: SVGSubElement, index: number) => {
		const elementIndex = parentIndex ? parentIndex + index : index;
		return {
			elem: child,
			name: `${child.nodeName} ${elementIndex}`,
			children: findSVGChildren(child, `${elementIndex}-`),
		};
	};

	const children = Array.from(parent.children) as SVGSubElement[];
	return children.map(processChild);
}
