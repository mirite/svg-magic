import type { HTMLAttributes, ReactElement } from "react";

import { twMerge } from "tailwind-merge";
/**
 * A pane in the window.
 *
 * @param props An extension of the div props.
 * @returns The component
 */
export function Pane(
	props: HTMLAttributes<HTMLDivElement> & { title: string },
): ReactElement {
	const { children, className: extendedClassName, title, ...rest } = props;
	const className = twMerge(
		"max-h-full overflow-auto border-l border-gray-300 px-4 py-6",
		extendedClassName,
	);
	return (
		<div className={className} {...rest}>
			<h2>{title}</h2>
			{children}
		</div>
	);
}
