import {
	faCancel,
	faCheck,
	faPen,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { type ReactElement, useEffect, useState } from "react";

import IconButton from "@/components/shared/IconButton.js";
import { Input } from "@/components/shared/Input.js";
import { removeClass, renameClass } from "@/helpers/transformers/index.js";
import type { ChangeOperation } from "@/types.js";

interface IProps {
	existingClassName: string;
	onChange: (changeOptions: ChangeOperation) => void;
}

/**
 * Displays an individual class in the class list
 *
 * @param props The component props
 * @returns The component
 */
function Class(props: IProps): ReactElement {
	const { existingClassName, onChange } = props;
	const [renaming, setRenaming] = useState<false | string>(false);

	/** Cancels the renaming action */
	function cancelRename() {
		setRenaming(false);
	}

	/** Commits the rename */
	function confirmRename() {
		if (!renaming) return;
		onChange((elem) =>
			renameClass(elem, {
				existingClassName,
				newClassName: renaming,
			}),
		);
		setRenaming(false);
	}

	/** Deletes the selected class */
	function deleteClass() {
		onChange((elem) =>
			removeClass(elem, {
				existingClassName,
			}),
		);
	}

	useEffect(() => setRenaming(false), [existingClassName]);

	return (
		<div className={"flex justify-between gap-2 items-center"}>
			<span>
				{renaming !== false ? (
					<Input
						label="New Name:"
						value={renaming}
						onChange={(e) => setRenaming(e.currentTarget.value)}
					/>
				) : (
					existingClassName
				)}
			</span>
			<div className="flex gap-2 items-center">
				{renaming !== false ? (
					<IconButton
						icon={faCheck}
						onClick={() => confirmRename()}
						title={"Save"}
					/>
				) : (
					<IconButton
						icon={faPen}
						onClick={() => setRenaming("")}
						title={"Rename"}
					/>
				)}
				{renaming !== false ? (
					<IconButton
						icon={faCancel}
						onClick={() => cancelRename()}
						title={"Cancel Renaming"}
					/>
				) : (
					<IconButton
						icon={faTrash}
						className={"bg-red-800"}
						onClick={() => deleteClass()}
						title={"Delete"}
					/>
				)}
			</div>
		</div>
	);
}

export default Class;
