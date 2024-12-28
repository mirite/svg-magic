import type { ReactElement } from "react";
import React, { useState } from "react";

import Button from "@/components/shared/Button.js";
import Group from "@/components/shared/Group.js";
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
		<Group element={"form"} onSubmit={(e) => handleSubmit(e)}>
			<h3>Add Group:</h3>
			<Input
				label={"Class:"}
				value={className}
				onChange={(e) => setClassName(e.currentTarget.value)}
			/>
			<Button type="submit">Add</Button>
		</Group>
	);
}

export default AddGroup;
