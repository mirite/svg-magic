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

export type ChangeOptions = IGroupOptions | IMoveOptions | IAssignClassOptions | IStripIDOptions | IStripDataOptions;

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
	type:'strip'
}

export interface IStripDataOptions {
	type:'stripData'
}

export { CSSTypes };
