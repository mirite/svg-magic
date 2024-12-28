import { type ReactElement, useEffect, useState } from "react";

import { Input } from "@/components/shared/Input.js";
import { removeClass, renameClass } from "@/helpers/transformers/index.js";
import type { ChangeOperation, IClassOptions } from "@/types.js";

interface IProps {
	name: string;
	onChange: (changeOptions: ChangeOperation) => void;
}

/**
 * Displays an individual class in the class list
 *
 * @param props The component props
 * @returns The component
 */
function Class(props: IProps): ReactElement {
	const { name, onChange } = props;
	const [renaming, setRenaming] = useState(false);
	const [newName, setNewName] = useState(name);

	/** Cancels the renaming action */
	function cancelRename() {
		setNewName(name);
		setRenaming(false);
	}

	/** Commits the rename */
	function confirmRename() {
		const options: IClassOptions = {
			existingClassName: name,
			newClassName: newName,
		};
		onChange((elem) => renameClass(elem, options));
		setRenaming(false);
	}

	/** Deletes the selected class */
	function deleteClass() {
		const options: IClassOptions = {
			existingClassName: name,
		};
		onChange((elem) => removeClass(elem, options));
	}

	useEffect(() => setNewName(name), [name]);

	return (
		<li className={"flex justify-between gap-2 items-center"}>
			<span>
				{renaming ? (
					<Input
						label="New Name:"
						value={newName}
						onChange={(e) => setNewName(e.currentTarget.value)}
					/>
				) : (
					name
				)}
			</span>
			<div className="flex gap-2 items-center">
				{renaming ? (
					<button type="button" onClick={() => confirmRename()}>
						Confirm
					</button>
				) : (
					<button type="button" onClick={() => setRenaming(true)}>
						Rename
					</button>
				)}
				{renaming ? (
					<button type="button" onClick={() => cancelRename()}>
						Cancel
					</button>
				) : (
					<button type="button" onClick={() => deleteClass()}>
						Delete
					</button>
				)}
			</div>
		</li>
	);
}

export default Class;
