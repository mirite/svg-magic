import { type ReactElement, useId, type InputHTMLAttributes } from "react";

import { InputWrapper } from "./InputWrapper.js";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
	label: string;
};

/**
 * A standarized radio input
 *
 * @param props The normal Input props and a label
 * @returns The component.
 */
export function Radio(props: Props): ReactElement {
	const { label, ...rest } = props;
	const id = useId();
	return (
		<InputWrapper>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="radio" {...rest} />
		</InputWrapper>
	);
}
