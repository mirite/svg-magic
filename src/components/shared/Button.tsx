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
		"rounded-full border-gray-800 px-4 border-2 py-2 font-semibold bg-gray-800 text-white hover:bg-transparent hover:text-gray-800 transition-all",
		extendedClassName,
	);
	return <button className={className} type={"button"} {...rest} />;
}
