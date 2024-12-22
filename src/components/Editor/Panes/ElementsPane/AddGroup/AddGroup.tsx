import { Input } from "components/shared/Input";
import { addGroup } from "helpers/transformers";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import type { ChangeOperation, IGroupOptions, IPath } from "types";

interface IProps {
	onChange: (changeOptions: ChangeOperation) => void;
	selected?: IPath[];
}

/** @param props */
function AddGroup(props: IProps): ReactElement {
	const createOptions = (): IGroupOptions => {
		return {
			className,
			selectedItems: selected,
		};
	};

	const { selected, onChange } = props;
	const [className, setClassName] = useState("");
	const [options, setOptions] = useState<IGroupOptions>(createOptions());

	//TODO The dpendencies here are off and likely doesn't need to be a useEffect in the first place.
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
