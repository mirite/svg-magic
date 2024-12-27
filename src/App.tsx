import type { ReactElement } from "react";

import { useEditor } from "./helpers/useEditor.js";

import Editor from "@/components/Editor/Editor.js";
import FileSelector from "@/components/FileSelector.js";

/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	const { handleCurrentFileUpdate, handleFileOpen, currentFile } = useEditor();
	if (currentFile) {
		return <Editor stateTuple={[currentFile, handleCurrentFileUpdate]} />;
	}
	return <FileSelector onSelect={handleFileOpen} />;
}

export default App;
