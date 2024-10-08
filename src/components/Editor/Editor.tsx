import { evaluateSVG } from "helpers/parsers";
import { performChange } from "helpers/transformer";
import React, { useEffect, useRef, useState } from "react";
import type { ChangeOperation, IPath, IPoint, ISVGRule } from "types";

import styles from "./Editor.module.css";
import Header from "./Header/Header";
import Panes from "./Panes/Panes";

interface IProps {
	contents: string;
	fileName: string;
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

/** @param props */
function Editor(props: IProps) {
	const { fileName, contents, onClose } = props;
	const [state, setState] = useState<IEditorState>(defaultState);
	const [workingSVG, setWorkingSVG] = useState<string>(contents);

	const svgContainer = useRef<HTMLDivElement>(null);
	const shadowContainer = useRef<HTMLDivElement>(null);

	const handleChange = (e: ChangeOperation) => {
		setWorkingSVG(performChange(shadowContainer, e, workingSVG));
	};

	useEffect(() => {
		setWorkingSVG(contents);
	}, [props]);

	useEffect(() => {
		if (!svgContainer) return;
		const newState = evaluateSVG(svgContainer.current);
		if (newState) {
			setState(newState);
		}
	}, [workingSVG]);

	return (
		<div className={styles.fileDisplay}>
			<Header
				workingSVG={workingSVG}
				fileName={fileName}
				onClose={() => onClose()}
				onChange={(e) => handleChange(e)}
			/>
			<Panes
				workingSVG={workingSVG}
				svgContainer={svgContainer}
				shadowContainer={shadowContainer}
				setWorkingSVG={(e) => setWorkingSVG(e)}
				handleChange={(e) => handleChange(e)}
				{...state}
			/>
			<div className={styles.shadowContainer} ref={shadowContainer}></div>
		</div>
	);
}

export default Editor;
