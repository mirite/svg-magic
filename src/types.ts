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
	type: string;
	options?: {
		[key: string]: any;
	};
}

export type ChangeOperation<T extends IChangeOptions> = {
	func: ChangeFunction<T>;
	options?: T;
};

export type ChangeFunction<T> = (elem: SVGSVGElement, options: T) => void;

export interface IGroupOptions extends IChangeOptions {
	type: 'group';
	options: {
		className?: string;
		selectedItems?: IPath[];
	};
}

export interface IMoveOptions extends IChangeOptions {
	type: 'move';
	options: {
		element: SVGSubElement;
		target: SVGSubElement;
	};
}

export interface IAssignClassOptions extends IChangeOptions {
	type: 'assign';
	options: {
		className: string;
		selectedItems: IPath[];
	};
}

export interface IStripIDOptions extends IChangeOptions {
	type: 'strip';
}

export interface IStripDataOptions extends IChangeOptions {
	type: 'stripData';
}

export interface IPrefixClassOptions extends IChangeOptions {
	type: 'prefixClasses';
	options?: {
		prefix?: string;
	};
}

export interface IClassOptions extends IChangeOptions {
	type: 'renameClass' | 'removeClass';
	options: {
		existingClassName: string;
		newClassName?: string;
	};
}

export interface IMovePointOptions extends IChangeOptions {
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

export interface IFile {
	title: string;
	contents: string;
}

export { CSSTypes };
