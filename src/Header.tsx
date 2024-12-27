import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ComponentType } from "react";
import { twMerge } from "tailwind-merge";

import type { UseEditorResult } from "./helpers/useEditor.js";

export const Header: ComponentType<{
	openFiles: UseEditorResult["openFiles"];
	currentFile: ReturnType<UseEditorResult["getCurrentFile"]>;
	goHome: () => void;
}> = (props) => {
	return (
		<header className="flex gap-2 items-center m-2 mb-0 fixed top-0 inset-x-0 h-[--nav-height]">
			<button
				className="[all:unset]"
				onClick={() => props.goHome()}
				type="button"
			>
				SVG Magic
			</button>
			<menu className="grow flex gap-2 items-center justify-end">
				{props.openFiles.map((open) => (
					<li
						key={open.file.file.title}
						className={twMerge(
							"flex gap-2 items-center border-black border-2 border-b-0 px-2 py-1 rounded-t-xl",
							props.currentFile === open.file && "bg-blue-200",
						)}
					>
						<button
							type="button"
							className="[all:unset]"
							onClick={open.switchTo}
						>
							{open.file.file.title}
						</button>
						<button
							className="leading-[0] p-1"
							type="button"
							onClick={open.close}
						>
							<FontAwesomeIcon size="sm" icon={faX} />
						</button>
					</li>
				))}
			</menu>
		</header>
	);
};
