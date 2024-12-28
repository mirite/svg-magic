import type { ReactElement } from "react";
import React, { useState } from "react";

import { Input } from "@/components/shared/Input.js";
import { addGroup } from "@/helpers/transformers/index.js";
import type { ChangeOperation, IPath } from "@/types.js";

interface IProps {
	onChange: (changeOptions: ChangeOperation) => void;
	selected?: IPath[];
}

/**
 * Add a group to the SVG
 *
 * @param props The component props.
 * @returns The rendered component.
 */
function AddGroup(props: IProps): ReactElement {
	const { selected, onChange } = props;
	const [className, setClassName] = useState("");

	/**
	 * Handle the form submission
	 *
	 * @param e The form event.
	 */
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onChange((elem) =>
			addGroup(elem, {
				className,
				selectedItems: selected,
			}),
		);
		setClassName("");
	}

	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Add Group:</h3>
			<Input
				label={"Class:"}
				value={className}
				onChange={(e) => setClassName(e.currentTarget.value)}
			/>
			<button type="submit">Add</button>
		</form>
	);
}

export default AddGroup;
