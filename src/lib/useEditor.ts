import { useState } from "react";

import type { EditorState, FileState, IFile } from "@/lib/types.js";

import { stripXMLDeclaration } from "@/lib/transformers/stripXMLDeclaration.js";

export type UseEditorResult = {
	/** The overall state of the editor */
	editorState: EditorState;
	/** A helper for accessing the currently open file */
	getCurrentFile: () => FileState | null;
	/** Clear the current file */
	goHome: () => void;
	/** A wrapper for updating the state of the currently open file. */
	handleCurrentFileUpdate: (
		newState: ((prev: FileState) => FileState) | FileState,
	) => void;
	/** A callback for loading a new file into the state. */
	handleFileOpen: (file: IFile) => void;
	/** Tools for dealing with the open files */
	openFiles: { close: () => void; file: FileState; switchTo: () => void }[];
};

/**
 * Get the open files from the editor state.
 *
 * @param editorState The current state of the editor.
 * @param setEditorState The function to update the editor state.
 * @returns The open files.
 */
function getOpenFiles(
	editorState: EditorState,
	setEditorState: (
		value: ((prevState: EditorState) => EditorState) | EditorState,
	) => void,
) {
	const openFiles: UseEditorResult["openFiles"] = [];
	for (let i = 0; i < editorState.files.length; i++) {
		const file = editorState.files[i];
		const close = () => {
			const newState = { ...editorState };
			newState.files.splice(i, 1);
			if (newState.currentFile) {
				if (newState.currentFile === i) {
					newState.currentFile = null;
				} else if (newState.currentFile > i) {
					newState.currentFile--;
				}
			}
			setEditorState(newState);
		};
		const switchTo = () => {
			const newState = { ...editorState };
			newState.currentFile = i;
			setEditorState(newState);
		};
		openFiles.push({ close, file, switchTo });
	}
	return openFiles;
}

/**
 * Simulates the setState for the current file that is open in the editor.
 *
 * @param newState Either the new state object or a function that takes the
 *   previous state and returns a new one.
 * @param editorState The current state of the editor.
 * @param setEditorState The function to update the editor state.
 * @throws Error if the current file isn't set and this function is called.
 */
function handleCurrentFileUpdate(
	newState: ((prev: FileState) => FileState) | FileState,
	editorState: EditorState,
	setEditorState: (
		value: ((prevState: EditorState) => EditorState) | EditorState,
	) => void,
) {
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
}

/**
 * Update the editor with the selected file's contents.
 *
 * @param e The newly selected file.
 * @param editorState The current state of the editor.
 * @param setEditorState The function to update the editor state.
 */
const handleFileOpen = (
	e: IFile,
	editorState: EditorState,
	setEditorState: (
		value: ((prevState: EditorState) => EditorState) | EditorState,
	) => void,
) => {
	const contents = stripXMLDeclaration(e.contents);
	const fileState: FileState = {
		file: {
			contents,
			title: e.title,
		},
		previous: [],
		selected: [],
	};
	const newEditorState = { ...editorState };
	newEditorState.files.push(fileState);
	newEditorState.currentFile = newEditorState.files.length - 1;
	setEditorState(newEditorState);
};

/**
 * Clear the current file from the editor to return to the file selector.
 *
 * @param setEditorState The function to update the editor state.
 */
function goHome(
	setEditorState: (
		value: ((prevState: EditorState) => EditorState) | EditorState,
	) => void,
) {
	setEditorState((previous) => {
		const newState = { ...previous };
		newState.currentFile = null;
		return newState;
	});
}

/**
 * Get the current file from the editor state.
 *
 * @param editorState The current state of the editor.
 * @returns The current file or null if there isn't one.
 */
const getCurrentFile = (editorState: EditorState) =>
	editorState.currentFile !== null && editorState.files[editorState.currentFile]
		? editorState.files[editorState.currentFile]
		: null;

/**
 * A hook for maintaining editor state.
 *
 * @returns The current state and the means of manipulating it.
 */
export function useEditor(): UseEditorResult {
	const [editorState, setEditorState] = useState<EditorState>({
		currentFile: null,
		files: [],
	});

	const openFiles = getOpenFiles(editorState, setEditorState);

	return {
		editorState,
		getCurrentFile: () => getCurrentFile(editorState),
		goHome: () => goHome(setEditorState),
		handleCurrentFileUpdate: (newState) =>
			handleCurrentFileUpdate(newState, editorState, setEditorState),
		handleFileOpen: (file: IFile) =>
			handleFileOpen(file, editorState, setEditorState),
		openFiles,
	};
}
