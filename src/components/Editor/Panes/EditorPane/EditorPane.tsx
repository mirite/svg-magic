import Button from "@/components/shared/Button.js";
import { Pane } from "@/components/shared/Pane.js";
import { performChange } from "@/helpers/performChange.js";
import { minify } from "@/helpers/transformers/minify.js";
import type { PaneComponent } from "@/types.js";

/**
 * The source editor pane
 *
 * @param props The source pane props.
 * @returns The component.
 */
const EditorPane: PaneComponent = (props) => {
	const { file } = props.stateTuple[0];
	const svgHTML = file.contents;
	const onManualEdit = (newContent: string) => {
		props.stateTuple[1]((previousState) => {
			const newState = { ...previousState };
			newState.file.contents = newContent;
			return newState;
		});
	};
	return (
		<Pane className={"flex flex-col"} title={"Raw"}>
			<div className={"flex justify-between gap-2 items-center mb-2"}>
				<Button onClick={() => performChange(props, minify)} type="button">
					Minify
				</Button>
			</div>
			<textarea
				value={svgHTML}
				className={"grow overflow-auto"}
				onChange={(e) => onManualEdit(e.currentTarget.value)}
				rows={svgHTML.split("\n").length}
			/>
		</Pane>
	);
};

export default EditorPane;
