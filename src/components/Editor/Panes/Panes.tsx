import React from "react";
import type { ChangeOperation } from "types";

import type { IEditorState } from "../Editor";

import EditorPane from "./EditorPane/EditorPane";
import ElementsPane from "./ElementsPane/ElementsPane";
import styles from "./Panes.module.css";
import PreviewPane from "./PreviewPane/PreviewPane";
import RulesPane from "./RulesPane/RulesPane";

interface IProps extends IEditorState {
	workingSVG: string;
	svgContainer: React.RefObject<HTMLDivElement | null>;
	shadowContainer: React.RefObject<HTMLDivElement | null>;
	setWorkingSVG: (newValue: string) => void;
	handleChange: (change: ChangeOperation) => void;
}

/** @param props */
function Panes(props: IProps) {
	const {
		paths,
		rules,
		classes,
		points,
		workingSVG,
		svgContainer,
		setWorkingSVG,
		handleChange,
	} = props;
	const svgElem = svgContainer.current?.querySelector("svg");

	return (
		<div className={styles.container}>
			<EditorPane
				svgHTML={workingSVG}
				onChange={(e) => handleChange(e)}
				onManualEdit={(e) => setWorkingSVG(e)}
			/>
			<ElementsPane
				paths={paths}
				onChange={(e) => handleChange(e)}
				svgRoot={svgElem}
				classes={classes}
			/>
			<RulesPane
				rules={rules}
				onChange={(e) => handleChange(e)}
				classes={classes}
			/>
			<PreviewPane
				containerRef={svgContainer}
				svgHTML={workingSVG}
				points={points}
				onChange={(e) => handleChange(e)}
			/>
		</div>
	);
}

export default Panes;
