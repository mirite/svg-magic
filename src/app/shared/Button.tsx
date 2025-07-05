import type { ButtonHTMLAttributes, ReactElement } from "react";

import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function Button(props: Props): ReactElement {
	const { className: extendedClassName, ...rest } = props;
	const className = twMerge(
		"rounded-full border-2 border-gray-800 bg-gray-800 px-2 py-1 text-white transition-all hover:bg-transparent hover:text-gray-800",
		extendedClassName,
	);
	return <button className={className} type={"button"} {...rest} />;
}
