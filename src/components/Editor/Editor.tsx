import { evaluateSVG } from "helpers/parsers";
import { performChange } from "helpers/transformer";
import type { ReactElement } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { ChangeOperation, IFile, IPath, IPoint, ISVGRule } from "types";

import Header from "./Header";
import Panes from "./Panes/Panes";

interface IProps {
	file: IFile;
	onClose: () => void;
}

export interface IEditorState {
	paths: IPath[];
	rules: ISVGRule[];
	classes: string[];
	points: IPoint[];
}

const defaultState: IEditorState = {
	paths: [],
	rules: [],
	classes: [],
	points: [],
};

/**
 * The main editor component.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Editor(props: IProps): ReactElement {
	const { file, onClose } = props;
	const { contents, title: fileName } = file;
	const [state, setState] = useState<IEditorState>(defaultState);
	const [workingSVG, setWorkingSVG] = useState<string>(contents);

	const svgContainer = useRef<HTMLDivElement>(null);
	const shadowContainer = useRef<HTMLDivElement>(null);

	const handleChange = (e: ChangeOperation) => {
		setWorkingSVG(performChange(shadowContainer, e, workingSVG));
	};

	useEffect(() => {
		setWorkingSVG(contents);
	}, [contents]);

	useEffect(() => {
		if (!svgContainer) return;
		const newState = evaluateSVG(svgContainer.current);
		if (newState) {
			setState(newState);
		}
	}, [workingSVG]);

	return (
		<div className={"h-dvh"}>
			<Header
				workingSVG={workingSVG}
				fileName={fileName}
				onClose={() => onClose()}
				onChange={(e) => handleChange(e)}
			/>
			<Panes
				workingSVG={workingSVG}
				svgContainer={svgContainer}
				setWorkingSVG={(e) => setWorkingSVG(e)}
				handleChange={(e) => handleChange(e)}
				{...state}
			/>
			<div ref={shadowContainer}></div>
		</div>
	);
}

export default Editor;
