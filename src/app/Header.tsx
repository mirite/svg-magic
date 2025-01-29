import type { ComponentType } from "react";

import type { UseEditorResult } from "@/lib/useEditor.js";

import { FileTab } from "@/app/FileTab.js";

export const Header: ComponentType<{
	openFiles: UseEditorResult["openFiles"];
	currentFile: ReturnType<UseEditorResult["getCurrentFile"]>;
	goHome: () => void;
}> = (props) => {
	return (
		<header className="flex gap-2 items-center m-2 mb-0 fixed top-0 inset-x-0 h-(--nav-height)">
			<button
				className="cursor-pointer text-2xl mb-2"
				onClick={() => props.goHome()}
				type="button"
			>
				SVG Magic
			</button>
			<menu className="grow flex gap-2 items-center justify-end">
				{props.openFiles.map((open, index) => (
					<li key={`${open.file.file.title}-${index}`}>
						<FileTab
							openFile={open}
							isCurrent={props.currentFile === open.file}
						/>
					</li>
				))}
			</menu>
		</header>
	);
};
