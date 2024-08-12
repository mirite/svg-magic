import { addGroup } from "helpers/transformers";
import React, { useEffect, useState } from "react";
import type { ChangeOperation, IGroupOptions, IPath } from "types";

interface IProps {
	onChange: (changeOptions: ChangeOperation) => void;
	selected?: IPath[];
}

/** @param props */
function AddGroup(props: IProps) {
	const createOptions = (): IGroupOptions => {
		return {
			className,
			selectedItems: selected,
		};
	};

	const { selected, onChange } = props;
	const [className, setClassName] = useState("");
	const [options, setOptions] = useState<IGroupOptions>(createOptions());

	useEffect(() => setOptions(createOptions()), [props.selected, className]);

	/** @param e */
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		onChange((elem) => addGroup(elem, options));
		setClassName("");
	}

	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Add Group:</h3>
			<label>
				Class:
				<input
					type="text"
					value={className}
					onChange={(e) => setClassName(e.currentTarget.value)}
				/>
			</label>
			<button>Add</button>
		</form>
	);
}

export default AddGroup;
