import React, { useState } from "react";

import type { PaneSubComponent } from "@/lib/types.js";

import Button from "@/app/shared/Button.js";
import { Input } from "@/app/shared/Input.js";
import { performChange } from "@/lib/performChange.js";
import { addGroup } from "@/lib/transformers/index.js";

/**
 * Add a group to the SVG
 *
 * @param props The component props.
 * @returns The rendered component.
 */
const AddGroup: PaneSubComponent = (props) => {
	const { selected } = props.stateTuple[0];
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
		<form
			className={"space-y-2"}
			data-testid={"add-group"}
			onSubmit={(e) => handleSubmit(e)}
		>
			<h4>Add Group:</h4>
			<Input
				label={"Class:"}
				onChange={(e) => setClassName(e.currentTarget.value)}
				value={className}
			/>
			<Button type="submit">Add</Button>
		</form>
	);
};

export default AddGroup;
