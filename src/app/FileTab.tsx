import { faX } from "@fortawesome/free-solid-svg-icons";
import React, { type ComponentType } from "react";
import { twMerge } from "tailwind-merge";

import IconButton from "@/app/shared/IconButton.js";
import type { UseEditorResult } from "@/lib/useEditor.js";

/**
 * A tab for an open file.
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const FileTab: ComponentType<{
	openFile: UseEditorResult["openFiles"][number];
	isCurrent: boolean;
}> = (props) => {
	const open = props.openFile;
	return (
		<div
			data-testid={`open-file-${open.file.file.title}`}
			className={twMerge(
				"flex gap-2 items-center border-black border-2 border-b-0 px-2 py-1 rounded-t-xl",
				props.isCurrent && "bg-blue-200",
				!props.isCurrent && "cursor-pointer hover:bg-gray-200",
			)}
		>
			<button
				type="button"
				disabled={props.isCurrent}
				onClick={() => open.switchTo()}
			>
				{open.file.file.title}
			</button>
			<IconButton
				className="text-[0.66rem] p-1"
				title={"Close"}
				onClick={() => open.close()}
				icon={faX}
			/>
		</div>
	);
};
