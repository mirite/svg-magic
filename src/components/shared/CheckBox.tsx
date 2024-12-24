import { type ReactElement, useId, type InputHTMLAttributes } from "react";

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
		<div className="flex gap-2 items-center">
			<label htmlFor={id}>{label}</label>
			<input id={id} type="checkbox" {...rest} />
		</div>
	);
}
