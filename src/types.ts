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

export type ChangeOptions =
	| IGroupOptions
	| IMoveOptions
	| IAssignClassOptions
	| IStripIDOptions
	| IStripDataOptions
	| IClassOptions
	| IMovePointOptions
	| IPrefixClassOptions;

export interface IGroupOptions {
	type: 'group';
	options: {
		className?: string;
		selectedItems?: IPath[];
	};
}

export interface IMoveOptions {
	type: 'move';
	options: {
		element: SVGSubElement;
		target: SVGSubElement;
	};
}

export interface IAssignClassOptions {
	type: 'assign';
	options: {
		className: string;
		selectedItems: IPath[];
	};
}

export interface IStripIDOptions {
	type: 'strip';
}

export interface IStripDataOptions {
	type: 'stripData';
}

export interface IPrefixClassOptions {
	type: 'prefixClasses';
	options?: {
		prefix?: string;
	};
}

export interface IClassOptions {
	type: 'renameClass' | 'removeClass';
	options: {
		existingClassName: string;
		newClassName?: string;
	};
}

export interface IMovePointOptions {
	type: 'movePoint';
	options: {
		element: SVGSubElement;
		pointToMove: { x: number; y: number };
		newLocation: { x: number; y: number };
	};
}

export interface IPoint {
	x: number;
	y: number;
	owner: Element;
}

export { CSSTypes };
