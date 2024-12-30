import React, { useState } from "react";

import Button from "@/app/shared/Button.js";
import { Input } from "@/app/shared/Input.js";
import { performChange } from "@/lib/performChange.js";
import { addGroup } from "@/lib/transformers/index.js";
import type { DependentPaneComponent, IPath } from "@/lib/types.js";

/**
 * Add a group to the SVG
 *
 * @param props The component props.
 * @returns The rendered component.
 */
const AddGroup: DependentPaneComponent<{ selected?: IPath[] }> = (props) => {
	const { selected } = props.additional;
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
				selectedItems: selected?.map((node) => node.id),
			}),
		);
		setClassName("");
	}

	return (
		<form
			data-testid={"add-group"}
			className={"space-y-2"}
			onSubmit={(e) => handleSubmit(e)}
		>
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
