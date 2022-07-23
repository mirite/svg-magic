import React from 'react';
import styles from "./EditorPane.module.css";

interface IProps {
	svgHTML: string;
	onChange: (newValue: string) => void;
}

function EditorPane(props: IProps) {
	const {svgHTML, onChange} = props;
	return (
		<div className={styles.editorPane}>
			<h2>Raw</h2>
			<textarea
				value={svgHTML}
				className={styles.editor}
				onChange={(e) => onChange(e.currentTarget.value)}
				rows={svgHTML.split('\n').length}
			></textarea>
		</div>
	);
}

export default EditorPane;
