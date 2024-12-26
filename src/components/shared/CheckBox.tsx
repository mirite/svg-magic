import { type ReactElement, useId, type InputHTMLAttributes } from "react";

import { InputWrapper } from "./InputWrapper.js";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
	label: string;
};

/**
 * A standarized checkbox input
 *
 * @param props The normal Input props and a label
 * @returns The component.
 */
export function Checkbox(props: Props): ReactElement {
	const { label, ...rest } = props;
	const id = useId();
	return (
		<InputWrapper>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="checkbox" {...rest} />
		</InputWrapper>
	);
}
