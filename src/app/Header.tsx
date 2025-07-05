import type { ComponentType } from "react";

import type { UseEditorResult } from "@/lib/useEditor.js";

import { FileTab } from "@/app/FileTab.js";

export const Header: ComponentType<{
	currentFile: ReturnType<UseEditorResult["getCurrentFile"]>;
	goHome: () => void;
	openFiles: UseEditorResult["openFiles"];
}> = (props) => {
	return (
		<header className="fixed inset-x-0 top-0 m-2 mb-0 flex h-(--nav-height) items-center gap-2">
			<button
				className="mb-2 cursor-pointer text-2xl"
				onClick={() => props.goHome()}
				type="button"
			>
				SVG Magic
			</button>
			<menu className="flex grow items-center justify-end gap-2">
				{props.openFiles.map((open, index) => (
					<li key={`${open.file.file.title}-${index}`}>
						<FileTab
							isCurrent={props.currentFile === open.file}
							openFile={open}
						/>
					</li>
				))}
			</menu>
		</header>
	);
};
