import type { ReactElement } from "react";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import type { FileProps } from "@/lib/types.js";

import IconButton from "@/app/shared/IconButton.js";
import ToolbarTool from "@/app/shared/ToolbarTool.js";
import { saveFile } from "@/lib/fileSaving.js";
import { performChange } from "@/lib/performChange.js";
import { tools } from "@/lib/transformers/toolbarTools.js";

/**
 * The header component for the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Toolbar(props: FileProps): ReactElement {
	const { contents, title } = props.stateTuple[0].file;

	return (
		<menu
			className={
				"fixed inset-x-0 top-(--nav-height) flex h-(--header-height) grow items-center justify-end gap-2 bg-blue-200 px-2 shadow-lg"
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
