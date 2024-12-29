import { faX } from "@fortawesome/free-solid-svg-icons";
import type { ComponentType } from "react";
import { twMerge } from "tailwind-merge";

import type { UseEditorResult } from "./helpers/useEditor.js";

import IconButton from "@/components/shared/IconButton.js";

export const Header: ComponentType<{
	openFiles: UseEditorResult["openFiles"];
	currentFile: ReturnType<UseEditorResult["getCurrentFile"]>;
	goHome: () => void;
}> = (props) => {
	return (
		<header className="flex gap-2 items-center m-2 mb-0 fixed top-0 inset-x-0 h-[--nav-height]">
			<button
				className="cursor-pointer text-2xl mb-2"
				onClick={() => props.goHome()}
				type="button"
			>
				SVG Magic
			</button>
			<menu className="grow flex gap-2 items-center justify-end">
				{props.openFiles.map((open) => (
					<li
						key={open.file.file.title}
						data-testid={`open-file-${open.file.file.title}`}
						className={twMerge(
							"flex gap-2 items-center border-black border-2 border-b-0 px-2 py-1 rounded-t-xl",
							props.currentFile === open.file && "bg-blue-200",
							props.currentFile !== open.file &&
								"cursor-pointer hover:bg-gray-200",
						)}
					>
						<button
							type="button"
							disabled={props.currentFile === open.file}
							onClick={open.switchTo}
						>
							{open.file.file.title}
						</button>
						<IconButton
							className="text-[0.66rem] p-1"
							title={"Close"}
							onClick={open.close}
							icon={faX}
						/>
					</li>
				))}
			</menu>
		</header>
	);
};
