import type { ReactElement } from "react";
import React, { useState } from "react";

import Editor from "@/components/Editor/Editor.js";
import FileSelector from "@/components/FileSelector.js";
import { stripXMLDeclaration } from "@/helpers/transformers/index.js";
import type { IFile } from "@/types.js";

/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	const [file, setFile] = useState<IFile>();

	/**
	 * Update the editor with the selected file's contents.
	 *
	 * @param e The newly selected file.
	 */
	function handleSelect(e: IFile) {
		const { title, contents } = e;
		const cleanedContents = stripXMLDeclaration(contents);
		setFile({ title, contents: cleanedContents });
	}

	if (file) return <Editor file={file} onClose={() => setFile(undefined)} />;

	return <FileSelector onSelect={(e: IFile) => handleSelect(e)} />;
}

export default App;
