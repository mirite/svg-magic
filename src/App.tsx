import Editor from "components/Editor/Editor";
import FileSelector from "components/FileSelector";
import { stripXMLDeclaration } from "helpers/transformers";
import type { ReactElement } from "react";
import React, { useState } from "react";
import type { IFile } from "types";

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

	return (
		<div>
			{file ? (
				<Editor
					contents={file.contents}
					fileName={file.title}
					onClose={() => setFile(undefined)}
				/>
			) : (
				<FileSelector onSelect={(e: IFile) => handleSelect(e)} />
			)}
		</div>
	);
}

export default App;
