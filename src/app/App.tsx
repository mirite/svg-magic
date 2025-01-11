import type { ReactElement } from "react";

import { useEditor } from "@/lib/useEditor.js";

import { Header } from "./Header.js";

import Editor from "@/app/Editor/Editor.js";
import FileSelector from "@/app/FileSelector.js";
/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	const {
		handleCurrentFileUpdate,
		handleFileOpen,
		getCurrentFile,
		openFiles,
		goHome,
	} = useEditor();
	const currentFile = getCurrentFile();

	return (
		<div>
			<Header openFiles={openFiles} currentFile={currentFile} goHome={goHome} />
			{currentFile ? (
				<Editor stateTuple={[currentFile, handleCurrentFileUpdate]} />
			) : (
				<FileSelector onSelect={handleFileOpen} />
			)}
		</div>
	);
}

export default App;
