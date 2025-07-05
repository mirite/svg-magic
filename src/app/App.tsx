import type { ReactElement } from "react";

import Editor from "@/app/Editor/Editor.js";
import FileSelector from "@/app/FileSelector.js";
import { useEditor } from "@/lib/useEditor.js";

import { Header } from "./Header.js";

/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	const {
		getCurrentFile,
		goHome,
		handleCurrentFileUpdate,
		handleFileOpen,
		openFiles,
	} = useEditor();
	const currentFile = getCurrentFile();

	return (
		<div>
			<Header currentFile={currentFile} goHome={goHome} openFiles={openFiles} />
			{currentFile ? (
				<Editor stateTuple={[currentFile, handleCurrentFileUpdate]} />
			) : (
				<FileSelector onSelect={handleFileOpen} />
			)}
		</div>
	);
}

export default App;
