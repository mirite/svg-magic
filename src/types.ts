import * as CSSTypes from 'css';

export type SVGSubElement =
	| SVGPathElement
	| SVGCircleElement
	| SVGPolygonElement
	| SVGLineElement
	| SVGTextElement
	| SVGDefsElement;

export interface IPath {
	name: string;
	elem: SVGSubElement;
	children: IPath[];
}

export type CSSContents = CSSTypes.Rule | CSSTypes.AtRule | CSSTypes.Comment;

export interface ISVGRule {
	rule: CSSContents;
}

export { CSSTypes };
