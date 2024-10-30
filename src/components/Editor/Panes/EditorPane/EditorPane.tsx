import { minify } from "helpers/transformers/minify";
import React from "react";
import type { ChangeOperation } from "types";

import { paneStyles } from "../paneStyles";

import styles from "./EditorPane.module.css";

interface IProps {
	svgHTML: string;
	onManualEdit: (newValue: string) => void;
	onChange: (e: ChangeOperation) => void;
}

/** @param props */
function EditorPane(props: IProps) {
	const { svgHTML, onManualEdit, onChange } = props;
	return (
		<div className={paneStyles + " " + styles.editorPane}>
			<h2>Raw</h2>
			<div className={styles.formattingOptions}>
				<button onClick={() => onChange(minify)}>Minify</button>
				{/*<button onClick={() => onChange(format)}>Format</button>*/}
			</div>
			<textarea
				value={svgHTML}
				className={styles.editor}
				onChange={(e) => onManualEdit(e.currentTarget.value)}
				rows={svgHTML.split("\n").length}
			></textarea>
		</div>
	);
}

export default EditorPane;
