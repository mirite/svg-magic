import styles from "./EditorPane.module.css";

import { Pane } from "@/components/shared/Pane.js";
import { minify } from "@/helpers/transformers/minify.js";
import type { PaneComponent } from "@/types.js";

/**
 * The source editor pane
 *
 * @param props The source pane props.
 * @returns The component.
 */
const EditorPane: PaneComponent = (props) => {
	const { workingSVG: svgHTML, onChange } = props.stateTuple[0];

	const onManualEdit = (newContent: string) => {
		props.stateTuple[1]((previousState) => {
			const newState = { ...previousState };
			newState.workingSVG = newContent;
			return newState;
		});
	};
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
};

export default EditorPane;
