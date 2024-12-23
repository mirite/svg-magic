import type { ReactElement } from "react";
import React from "react";

import { saveFile } from "@/helpers/fileSaving.js";
import {
	prefixClasses,
	stripData,
	stripIDs,
} from "@/helpers/transformers/index.js";
import { inlineStyles } from "@/helpers/transformers/inlineStyles.js";
import { stripClasses } from "@/helpers/transformers/stripClasses.js";
import type { ChangeOperation } from "@/types.js";

interface IProps {
	workingSVG: string;
	fileName: string;
	onClose: () => void;
	onChange: (changeOptions: ChangeOperation) => void;
}

/**
 * The header component for the editor.
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function Header(props: IProps): ReactElement {
	const { workingSVG, onChange, onClose, fileName } = props;

	return (
		<header
			className={
				"flex items-center bg-blue-200 p-4 h-[--header-height] shadow-lg"
			}
		>
			<h1>SVG Magic</h1>
			<div className={"flex gap-4 items-center grow justify-end"}>
				<button type={"button"} onClick={() => onChange(inlineStyles)}>
					Inline Styles
				</button>
				<button type={"button"} onClick={() => onChange(prefixClasses)}>
					Prefix Classes
				</button>
				<button type={"button"} onClick={() => onChange(stripIDs)}>
					Strip IDs
				</button>
				<button type={"button"} onClick={() => onChange(stripClasses)}>
					Strip Classes
				</button>
				<button type={"button"} onClick={() => onChange(stripData)}>
					Strip Data
				</button>
				<button
					type={"button"}
					className="positive"
					onClick={() => saveFile(workingSVG, fileName)}
				>
					Save
				</button>
				<button
					type={"button"}
					className="destructive"
					onClick={() => onClose()}
				>
					Close
				</button>
			</div>
		</header>
	);
}

export default Header;
