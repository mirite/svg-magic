import type { EditorState, IFile, FileState } from "@/types.js";
import { useState } from "react";
import { stripXMLDeclaration } from "@/helpers/transformers/stripXMLDeclaration.js";
type UseEditorResult = {
	/** The overal state of the editor */
	editorState: EditorState;
	/** A callback for loading a new file into the state. */
	handleFileOpen: (file: IFile) => void;
	/** A wrapper for updating the state of the currently open file. */
	handleCurrentFileUpdate: (
		newState: FileState | ((prev: FileState) => FileState),
	) => void;
	/** A helper for accessing the currently open file */
	currentFile: FileState | null;
};

/**
 * A hook for maintaining editor state.
 *
 * @returns The current state and the means of manipulating it.
 */
export function useEditor(): UseEditorResult {
	const [editorState, setEditorState] = useState<EditorState>({
		files: [],
		currentFile: null,
	});

	/**
	 * Update the editor with the selected file's contents.
	 *
	 * @param e The newly selected file.
	 */
	const handleFileOpen = (e: IFile) => {
		const contents = stripXMLDeclaration(e.contents);
		const fileState: FileState = {
			file: {
				title: e.title,
				contents,
			},
			previous: [],
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
		newEditorState.files[current].previous.unshift(
			editorState.files[current].file.contents,
		);
		setEditorState(newEditorState);
	};
	const currentFile =
		editorState.currentFile !== null &&
		editorState.files[editorState.currentFile]
			? editorState.files[editorState.currentFile]
			: null;

	return { editorState, handleFileOpen, handleCurrentFileUpdate, currentFile };
}
