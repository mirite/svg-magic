import type { ReactElement } from "react";

import EditorPane from "./EditorPane/EditorPane.js";
import ElementsPane from "./ElementsPane/ElementsPane.js";
import PreviewPane from "./PreviewPane/PreviewPane.js";
import RulesPane from "./RulesPane/RulesPane.js";

import type { FileProps } from "@/types.js";

type IProps = FileProps;

/**
 * The panes of the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Panes(props: IProps): ReactElement {
	return (
		<div
			className={
				"grid grid-cols-2 xl:grid-cols-4 h-[calc(100dvh_-_var(--header-height))] overflow-hidden"
			}
		>
			<EditorPane stateTuple={props.stateTuple} />
			<ElementsPane stateTuple={props.stateTuple} />
			<RulesPane stateTuple={props.stateTuple} />
			<PreviewPane stateTuple={props.stateTuple} />
		</div>
	);
}

export default Panes;
