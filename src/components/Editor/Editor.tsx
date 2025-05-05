import type { ReactElement } from "react";

import type { FileProps } from "@/types.js";

import Panes from "./Panes/Panes.js";
import Toolbar from "./Toolbar.js";


/**
 * The main editor component.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Editor(props: FileProps): ReactElement {
	return (
		<div className={"h-dvh"}>
			<Toolbar stateTuple={props.stateTuple} />
			<Panes stateTuple={props.stateTuple} />
		</div>
	);
}

export default Editor;
