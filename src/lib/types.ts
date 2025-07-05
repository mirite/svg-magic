import type { ComponentType, Dispatch, SetStateAction } from "react";

import * as CSSTypes from "css";

export { CSSTypes };

export type ChangeOperation = (e: SVGSVGElement) => void;

export type CSSContents = CSSTypes.AtRule | CSSTypes.Comment | CSSTypes.Rule;

/**
 * A pane sub-component that requires additional props from a parent pane or
 * sub-pane.
 *
 * @template T The additional props required.
 */
export type DependentPaneComponent<T extends object> = ComponentType<
	FileProps & { additional: T }
>;

export type EditorState = {
	currentFile: null | number;
	files: FileState[];
};

export type FileProps = {
	stateTuple: [FileState, Dispatch<SetStateAction<FileState>>];
};

export type FileState = {
	file: IFile;
	previous: IFile["contents"][];
	selected: number[];
};

export interface IFile {
	contents: string;
	title: string;
}

export interface IPath {
	children: IPath[];
	elem: SVGSubElement;
	id: number;
	name: string;
}

export interface IPoint {
	owner: Element;
	x: number;
	y: number;
}

export interface ISVGRule {
	rule: CSSContents;
}

export type PaneComponent = ComponentType<FileProps>;

// Just to prepare for future divergence between the two.
export type PaneSubComponent = ComponentType<FileProps>;
export type SVGSubElement =
	| SVGCircleElement
	| SVGDefsElement
	| SVGElement
	| SVGLineElement
	| SVGPathElement
	| SVGPolygonElement
	| SVGTextElement;
