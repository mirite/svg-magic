import { type ReactElement, type SelectHTMLAttributes, useId } from "react";

import { InputWrapper } from "./InputWrapper.js";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string };

/**
 * A standardized select input
 *
 * @param props The select props
 * @returns The component
 */
export function Select(props: Props): ReactElement {
	const { children, label, ...rest } = props;
	const id = useId();
	return (
		<InputWrapper>
			<label htmlFor={id}>{label}</label>
			<select id={id} {...rest}>
				{children}
			</select>
		</InputWrapper>
	);
}
