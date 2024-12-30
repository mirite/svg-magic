import type { FileProps } from "@/lib/types.js";

/**
 * Renames a file
 *
 * @param newName The new name of the file
 * @param fileProps The file properties
 */
export function renameFile(newName: string, fileProps: FileProps): void {
	const { stateTuple } = fileProps;
	const [state, setState] = stateTuple;
	const newState = { ...state };
	newState.file.title = newName;
	setState(newState);
}
