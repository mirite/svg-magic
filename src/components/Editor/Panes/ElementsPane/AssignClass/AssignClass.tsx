import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { Checkbox } from "@/components/shared/CheckBox.js";
import { Input } from "@/components/shared/Input.js";
import { Select } from "@/components/shared/Select.js";
import { assignClass } from "@/helpers/transformers/index.js";
import type { ChangeOperation, IAssignClassOptions, IPath } from "@/types.js";

interface IProps {
	selected: IPath[];
	onChange: (options: ChangeOperation) => void;
	classes: string[];
}

/**
 * Controls for assigning a new or existing class to the selected classes.
 *
 * @param props The component props.
 * @returns The component.
 */
function AssignClass(props: IProps): ReactElement {
	const { selected: selectedItems, classes, onChange } = props;
	const [useExisting, setUseExisting] = useState(true);
	const [className, setClassName] = useState("");
	const options: IAssignClassOptions = {
		className,
		selectedItems,
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onChange((elem) => assignClass(elem, options));
		setUseExisting(true);
		setClassName("");
	};
	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Assign Class:</h3>
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
					{classes.map((c, i) => (
						<option key={i} value={c}>
							{c}
						</option>
					))}
				</Select>
			) : (
				<Input
					label="Class:"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			)}
			<button
				disabled={selectedItems.length === 0 || className === ""}
				type="button"
			>
				Assign
			</button>
		</form>
	);
}

export default AssignClass;
