import type { FormEvent } from "react";

import { useState } from "react";

import type { PaneSubComponent } from "@/lib/types.js";

import Button from "@/app/shared/Button.js";
import { Checkbox } from "@/app/shared/CheckBox.js";
import { Input } from "@/app/shared/Input.js";
import { Select } from "@/app/shared/Select.js";
import { getClasses } from "@/lib/getClasses.js";
import { getSVGElement } from "@/lib/getSVGElement.js";
import { performChange } from "@/lib/performChange.js";
import { assignClass } from "@/lib/transformers/index.js";

/**
 * Controls for assigning a new or existing class to the selected classes.
 *
 * @param props The component props.
 * @returns The component.
 */
const AssignClass: PaneSubComponent = (props) => {
	const svgRoot = getSVGElement(props);
	const selectedItems = props.stateTuple[0].selected;
	const classes = getClasses(svgRoot);

	const [useExisting, setUseExisting] = useState(true);
	const [className, setClassName] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		performChange(props, (elem) =>
			assignClass(elem, {
				className,
				selectedItems,
			}),
		);
		setUseExisting(true);
		setClassName("");
	};
	return (
		<form
			className={"space-y-2"}
			data-testid={"assign-class"}
			onSubmit={(e) => handleSubmit(e)}
		>
			<h4>Assign Class:</h4>
			<Checkbox
				checked={useExisting}
				label="Existing?"
				onChange={(e) => {
					setClassName("");
					setUseExisting(e.currentTarget.checked);
				}}
			/>
			{useExisting ? (
				<Select
					label="Class:"
					onChange={(e) => setClassName(e.currentTarget.value)}
					value={className}
				>
					<option value="">Select an Existing Class</option>
					{classes.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</Select>
			) : (
				<Input
					label="Class:"
					onChange={(e) => setClassName(e.currentTarget.value)}
					value={className}
				/>
			)}
			<Button
				disabled={selectedItems.length === 0 || className === ""}
				type={"submit"}
			>
				Assign
			</Button>
		</form>
	);
};

export default AssignClass;
