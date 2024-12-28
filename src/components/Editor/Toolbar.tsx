import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

import ToolbarTool from "@/components/shared/ToolbarTool.js";
import { saveFile } from "@/helpers/fileSaving.js";
import { performChange } from "@/helpers/performChange.js";
import {
	prefixClasses,
	stripData,
	stripIDs,
} from "@/helpers/transformers/index.js";
import { inlineStyles } from "@/helpers/transformers/inlineStyles.js";
import { stripClasses } from "@/helpers/transformers/stripClasses.js";
import type { FileProps } from "@/types.js";

const tools = [
	{
		name: "Inline Styles",
		action: inlineStyles,
	},
	{
		name: "Prefix Classes",
		action: prefixClasses,
	},
	{
		name: "Strip IDs",
		action: stripIDs,
	},
	{
		name: "Strip Classes",
		action: stripClasses,
	},
	{
		name: "Strip Data",
		action: stripData,
	},
];
/**
 * The header component for the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Toolbar(props: FileProps): ReactElement {
	const [state] = props.stateTuple;
	const { file } = state;
	const { title, contents } = file;
	return (
		<menu
			className={
				"fixed top-[--nav-height] inset-x-0 bg-blue-200 p-2 h-[--header-height] shadow-lg flex gap-4 items-center grow justify-end"
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
				<ToolbarTool onClick={() => saveFile(contents, title)}>
					<FontAwesomeIcon icon={faFloppyDisk} />
				</ToolbarTool>
			</li>
		</menu>
	);
}

export default Toolbar;
