import { type ReactElement } from "react";

import type { FileProps } from "@/lib/types.js";

import EditorPane from "./EditorPane/EditorPane.js";
import PreviewPane from "./PreviewPane/PreviewPane.js";
import StructurePane from "./StructurePane/StructurePane.js";
import StylesPane from "./StylesPane/StylesPane.js";

type IProps = FileProps;

/**
 * The panes of the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Panes(props: IProps): ReactElement {
	const panes = [EditorPane, StructurePane, StylesPane, PreviewPane];
	return (
		<div
			className={
				"fixed inset-x-0 top-(--content-top) grid h-[calc(100dvh_-_var(--content-top))] grid-cols-2 overflow-hidden xl:grid-cols-4"
			}
		>
			{panes.map((Pane, index) => (
				<Pane key={Pane.displayName || index} {...props} />
			))}
		</div>
	);
}

export default Panes;
