import * as CSSTypes from "css";
import type { ComponentType, Dispatch, SetStateAction } from "react";

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

export type FileState = {
	file: IFile;
	svgContainer: HTMLDivElement | null;
	onChange: (operation: ChangeOperation) => void;
	previous: IFile["contents"][];
};

export type EditorState = {
	files: FileState[];
	currentFile: number | null;
};

export type FileProps = {
	stateTuple: [FileState, Dispatch<SetStateAction<FileState>>];
};

export type PaneComponent = ComponentType<FileProps>;

// Just to prepare for future divergance between the two.
export type PaneSubComponent = ComponentType<FileProps>;
