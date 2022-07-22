import CSSParser from 'css';

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

export type CSSContents = CSSParser.Rule | CSSParser.AtRule | CSSParser.Comment;

export interface ISVGRule {
	rule: CSSContents;
}
