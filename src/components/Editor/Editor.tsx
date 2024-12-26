import type { ReactElement } from "react";

import Header from "./Header.js";
import Panes from "./Panes/Panes.js";

import type { FileProps } from "@/types.js";

/**
 * The main editor component.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Editor(props: FileProps): ReactElement {
	return (
		<div className={"h-dvh"}>
			<Header stateTuple={props.stateTuple} />
			<Panes stateTuple={props.stateTuple} />
		</div>
	);
}

export default Editor;
