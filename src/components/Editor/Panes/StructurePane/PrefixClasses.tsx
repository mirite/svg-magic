import type { FormEvent } from "react";
import { useState } from "react";

import Button from "@/components/shared/Button.js";
import Group from "@/components/shared/Group.js";
import { Input } from "@/components/shared/Input.js";
import { performChange } from "@/helpers/performChange.js";
import { prefixClasses } from "@/helpers/transformers/index.js";
import type { IPrefixClassOptions, PaneSubComponent } from "@/types.js";

const PrefixClasses: PaneSubComponent = (props) => {
	const [prefix, setPrefix] = useState("");

	const options: IPrefixClassOptions = {
		prefix,
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		performChange(props, (elem) => prefixClasses(elem, options));
		setPrefix("");
	};

	return (
		<Group onSubmit={(e) => handleSubmit(e)}>
			<h3>Prefix Classes:</h3>
			<Input
				type="text"
				label="Prefix:"
				required
				value={prefix}
				onChange={(e) => setPrefix(e.currentTarget.value)}
			/>
			<Button type="submit" disabled={prefix === ""}>
				Add Prefix
			</Button>
		</Group>
	);
};

export default PrefixClasses;
