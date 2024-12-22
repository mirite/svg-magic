import { Input } from "components/shared/Input";
import { prefixClasses } from "helpers/transformers";
import type { FormEvent, ReactElement } from "react";
import { useState } from "react";
import type { ChangeOperation, IPrefixClassOptions } from "types";

interface IProps {
	onChange: (options: ChangeOperation) => void;
}

const PrefixClasses = (props: IProps): ReactElement => {
	const { onChange } = props;
	const [prefix, setPrefix] = useState("");

	const options: IPrefixClassOptions = {
		prefix,
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onChange((elem) => prefixClasses(elem, options));
		setPrefix("");
	};

	return (
		<form className="group" onSubmit={(e) => handleSubmit(e)}>
			<h3>Prefix Classes:</h3>
			<Input
				type="text"
				label="Prefix:"
				required
				value={prefix}
				onChange={(e) => setPrefix(e.currentTarget.value)}
			/>
			<button type="submit" disabled={prefix === ""}>
				Add Prefix
			</button>
		</form>
	);
};

export default PrefixClasses;
