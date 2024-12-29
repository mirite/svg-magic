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
	id: number;
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

export interface IPrefixClassOptions {
	prefix?: string;
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

// Just to prepare for future divergence between the two.
export type PaneSubComponent = ComponentType<FileProps>;
/**
 * A pane sub-component that requires additional props from a parent pane or
 * sub-pane.
 *
 * @template T The additional props required.
 */
export type DependentPaneComponent<T extends object> = ComponentType<
	FileProps & { additional: T }
>;
