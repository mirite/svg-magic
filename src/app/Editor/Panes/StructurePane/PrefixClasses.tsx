import type { FormEvent } from "react";
import { useState } from "react";

import { performChange } from "@/lib/performChange.js";
import type { IPrefixClassOptions } from "@/lib/transformers/index.js";
import { prefixClasses } from "@/lib/transformers/index.js";
import type { PaneSubComponent } from "@/lib/types.js";

import Button from "@/app/shared/Button.js";
import Group from "@/app/shared/Group.js";
import { Input } from "@/app/shared/Input.js";

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
