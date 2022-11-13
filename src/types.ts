import * as CSSTypes from 'css';
export { CSSTypes };

export type SVGSubElement =
	| SVGElement
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

export type ChangeOperation = (e: SVGSVGElement) => void;

export interface IGroupOptions {
	className?: string;
	selectedItems?: IPath[];
}

export interface IMoveOptions {
	element: SVGSubElement;
	target: SVGSubElement;
}

export interface IAssignClassOptions {
	className: string;
	selectedItems: IPath[];
}

export interface IStripIDOptions {}

export interface IStripDataOptions {}

export interface IPrefixClassOptions {
	prefix?: string;
}

export interface IClassOptions {
	existingClassName: string;
	newClassName?: string;
}

export interface IMovePointOptions {
	element: SVGSubElement;
	pointToMove: { x: number; y: number };
	newLocation: { x: number; y: number };
}

export interface IPoint {
	x: number;
	y: number;
	owner: Element;
}

export interface IFile {
	title: string;
	contents: string;
}
