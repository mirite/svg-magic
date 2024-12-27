import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

import { saveFile } from "@/helpers/fileSaving.js";
import { performChange } from "@/helpers/transformer.js";
import {
	prefixClasses,
	stripData,
	stripIDs,
} from "@/helpers/transformers/index.js";
import { inlineStyles } from "@/helpers/transformers/inlineStyles.js";
import { stripClasses } from "@/helpers/transformers/stripClasses.js";
import type { FileProps } from "@/types.js";
/**
 * The header component for the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Header(props: FileProps): ReactElement {
	const [state] = props.stateTuple;
	const { file } = state;
	const { title, contents } = file;
	return (
		<header
			className={
				"flex items-center bg-blue-200 p-4 h-[--header-height] shadow-lg"
			}
		>
			<h1>SVG Magic</h1>
			<div className={"flex gap-4 items-center grow justify-end"}>
				<button
					type={"button"}
					onClick={() => performChange(props, inlineStyles)}
				>
					Inline Styles
				</button>
				<button
					type={"button"}
					onClick={() => performChange(props, prefixClasses)}
				>
					Prefix Classes
				</button>
				<button type={"button"} onClick={() => performChange(props, stripIDs)}>
					Strip IDs
				</button>
				<button
					type={"button"}
					onClick={() => performChange(props, stripClasses)}
				>
					Strip Classes
				</button>
				<button type={"button"} onClick={() => performChange(props, stripData)}>
					Strip Data
				</button>
				<button type={"button"} onClick={() => saveFile(contents, title)}>
					<FontAwesomeIcon icon={faFloppyDisk} />{" "}
				</button>
			</div>
		</header>
	);
}

export default Header;
