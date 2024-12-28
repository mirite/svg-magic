import React, { useState } from "react";

import Button from "@/components/shared/Button.js";
import { Input } from "@/components/shared/Input.js";
import { performChange } from "@/helpers/performChange.js";
import { addGroup } from "@/helpers/transformers/index.js";
import type { DependentPaneComponent, IPath } from "@/types.js";

/**
 * Add a group to the SVG
 *
 * @param props The component props.
 * @returns The rendered component.
 */
const AddGroup: DependentPaneComponent<{ selected?: IPath[] }> = (props) => {
	const { selected } = props;
	const [className, setClassName] = useState("");

	/**
	 * Handle the form submission
	 *
	 * @param e The form event.
	 */
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		performChange(props, (elem) =>
			addGroup(elem, {
				className,
				selectedItems: selected,
			}),
		);
		setClassName("");
	}

	return (
		<form className={"space-y-2"} onSubmit={(e) => handleSubmit(e)}>
			<h4>Add Group:</h4>
			<Input
				label={"Class:"}
				value={className}
				onChange={(e) => setClassName(e.currentTarget.value)}
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};

export default AddGroup;
