import * as CSSTypes from 'css';

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

export interface IChangeOptions {
	[key: string]: any;
}

export type ChangeOperation<T extends IChangeOptions> = {
	func: ChangeFunction<T>;
};

export type ChangeFunction<T> = (elem: SVGSVGElement, options: T) => void;

export interface IGroupOptions extends IChangeOptions {
	className?: string;
	selectedItems?: IPath[];
}

export interface IMoveOptions extends IChangeOptions {
	element: SVGSubElement;
	target: SVGSubElement;
}

export interface IAssignClassOptions extends IChangeOptions {
	className: string;
	selectedItems: IPath[];
}

export interface IStripIDOptions extends IChangeOptions {}

export interface IStripDataOptions extends IChangeOptions {}

export interface IPrefixClassOptions extends IChangeOptions {
	prefix?: string;
}

export interface IClassOptions extends IChangeOptions {
	existingClassName: string;
	newClassName?: string;
}

export interface IMovePointOptions extends IChangeOptions {
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

export { CSSTypes };
