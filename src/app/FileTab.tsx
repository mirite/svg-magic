import { faX } from "@fortawesome/free-solid-svg-icons";
import React, { type ComponentType } from "react";
import { twMerge } from "tailwind-merge";

import type { UseEditorResult } from "@/lib/useEditor.js";

import IconButton from "@/app/shared/IconButton.js";

/**
 * A tab for an open file.
 *
 * @param props The props for the component.
 * @returns The component.
 */
export const FileTab: ComponentType<{
	isCurrent: boolean;
	openFile: UseEditorResult["openFiles"][number];
}> = (props) => {
	const open = props.openFile;
	return (
		<div
			className={twMerge(
				"flex items-center gap-2 rounded-t-xl border-2 border-b-0 border-black px-2 py-1",
				props.isCurrent && "bg-blue-200",
				!props.isCurrent && "cursor-pointer hover:bg-gray-200",
			)}
			data-testid={`open-file-${open.file.file.title}`}
		>
			<button
				disabled={props.isCurrent}
				onClick={() => open.switchTo()}
				type="button"
			>
				{open.file.file.title}
			</button>
			<IconButton
				className="p-1 text-[0.66rem]"
				icon={faX}
				onClick={() => open.close()}
				title={"Close"}
			/>
		</div>
	);
};
