import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import type { ReactElement } from "react";

import IconButton from "@/components/shared/IconButton.js";
import ToolbarTool from "@/components/shared/ToolbarTool.js";
import { saveFile } from "@/helpers/fileSaving.js";
import { performChange } from "@/helpers/performChange.js";
import { tools } from "@/helpers/transformers/toolbarTools.js";
import type { FileProps } from "@/types.js";

/**
 * The header component for the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Toolbar(props: FileProps): ReactElement {
	const { title, contents } = props.stateTuple[0].file;

	return (
		<menu
			className={
				"fixed top-[--nav-height] inset-x-0 bg-blue-200 px-2 h-[--header-height] shadow-lg flex gap-2 items-center grow justify-end"
			}
		>
			{tools.map((tool) => (
				<li key={tool.name}>
					<ToolbarTool onClick={() => performChange(props, tool.action)}>
						{tool.name}
					</ToolbarTool>
				</li>
			))}
			<li>
				<IconButton
					icon={faFloppyDisk}
					onClick={() => saveFile(contents, title)}
					title={"Save"}
				/>
			</li>
		</menu>
	);
}

export default Toolbar;
