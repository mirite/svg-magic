import type { ReactElement } from "react";
import { useState } from "react";

import Editor from "@/components/Editor/Editor.js";
import FileSelector from "@/components/FileSelector.js";
import { stripXMLDeclaration } from "@/helpers/transformers/index.js";
import type { EditorState, FileState, IFile } from "@/types.js";

const defaultState = {
	paths: [],
	rules: [],
	classes: [],
	points: [],
};

/**
 * The main application component.
 *
 * @returns The main application component.
 */
function App(): ReactElement {
	const [editorState, setEditorState] = useState<EditorState>({
		files: [],
		currentFile: null,
	});

	/**
	 * Update the editor with the selected file's contents.
	 *
	 * @param e The newly selected file.
	 */
	const handleSelect = (e: IFile) => {
		const contents = stripXMLDeclaration(e.contents);
		const fileState: FileState = {
			file: {
				title: e.title,
				contents,
			},
			...defaultState,
			workingSVG: contents,
			onChange: (operation) => {
				// TODO Implement a wrapper for handle current file update
				// 	const handleChange = (e: ChangeOperation) => {
				//	handleCurrentFileUpdate(performChange(shadowContainer, e, workingSVG));

				console.log(operation);
			},
			previous: [],
			svgContainer: null,
		};
		const newEditorState = { ...editorState };
		newEditorState.files.push(fileState);
		newEditorState.currentFile = newEditorState.files.length - 1;
		setEditorState(newEditorState);
	};

	/**
	 * Simulates the setState for the current file that is open in the editor.
	 *
	 * @param newState Either the new state object or a function that takes the
	 *   previous state and returns a new one.
	 * @throws Error if the current file isn't set and this function is called.
	 */
	const handleCurrentFileUpdate = (
		newState: FileState | ((prev: FileState) => FileState),
	): void => {
		const current = editorState.currentFile;
		if (current === null)
			throw new Error("Trying to update a file that isn't active");
		const newEditorState = structuredClone(editorState);

		if (typeof newState === "function") {
			newEditorState.files[current] = newState(newEditorState.files[current]);
		} else {
			newEditorState.files[current] = newState;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const newHistoryItem: any = editorState.files[current];
		delete newHistoryItem.previous;
		delete newHistoryItem.onChange;
		delete newHistoryItem.file;
		newEditorState.files[current].previous.unshift(newHistoryItem);
		setEditorState(newEditorState);
	};

	if (
		editorState.currentFile !== null &&
		editorState.files[editorState.currentFile]
	)
		return (
			<Editor
				stateTuple={[
					editorState.files[editorState.currentFile],
					handleCurrentFileUpdate,
				]}
			/>
		);

	return <FileSelector onSelect={(e: IFile) => handleSelect(e)} />;
}

export default App;
