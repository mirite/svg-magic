import type { HTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";
/**
 * A pane in the window.
 *
 * @param props An extension of the div props.
 * @returns The component
 */
export function Pane(props: HTMLAttributes<HTMLDivElement>): ReactElement {
	const { className: extendedClassName, children, ...rest } = props;
	const className = twMerge(
		"max-h-full overflow-auto px-4 py-6 border-l border-gray-300",
		extendedClassName,
	);
	return (
		<div className={className} {...rest}>
			{children}
		</div>
	);
}
