import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { assignClass } from "@/helpers/transformers/index.js";
import type { ChangeOperation, IAssignClassOptions, IPath } from "@/types.js";
import { Checkbox } from "@/components/shared/CheckBox.js";

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
			<label htmlFor="assign-class-name">
				Class:
				{useExisting ? (
					<select
						id="assign-class-name"
						required
						onChange={(e) => setClassName(e.currentTarget.value)}
						value={className}
					>
						<option value="">Select an Existing Class</option>
						{classes.map((c, i) => (
							<option key={i} value={c}>
								{c}
							</option>
						))}
					</select>
				) : (
					<input
						id="assign-class-name"
						type="text"
						required
						value={className}
						onChange={(e) => setClassName(e.currentTarget.value)}
					/>
				)}
			</label>
			<button disabled={selectedItems.length === 0 || className === ""}>
				Assign
			</button>
		</form>
	);
}

export default AssignClass;
