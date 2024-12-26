import type { ReactElement } from "react";

import styles from "./EditorPane.module.css";

import { Pane } from "@/components/shared/Pane.js";
import { minify } from "@/helpers/transformers/minify.js";
import type { ChangeOperation } from "@/types.js";

interface IProps {
	svgHTML: string;
	onManualEdit: (newValue: string) => void;
	onChange: (e: ChangeOperation) => void;
}

/**
 * The source editor pane
 *
 * @param props The source pane props.
 * @returns The component.
 */
function EditorPane(props: IProps): ReactElement {
	const { svgHTML, onManualEdit, onChange } = props;
	return (
		<Pane className={styles.editorPane}>
			<div className={"flex justify-between gap-2 items-center mb-2"}>
				<h2>Raw</h2>
				<button onClick={() => onChange(minify)} type="button">
					Minify
				</button>
			</div>
			<textarea
				value={svgHTML}
				className={styles.editor}
				onChange={(e) => onManualEdit(e.currentTarget.value)}
				rows={svgHTML.split("\n").length}
			></textarea>
		</Pane>
	);
}

export default EditorPane;
