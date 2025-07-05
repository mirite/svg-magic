import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import type { ButtonHTMLAttributes, ReactElement } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
	icon: FontAwesomeIconProps["icon"];
	title: string;
};

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function IconButton(props: Props): ReactElement {
	const { className: extendedClassName, icon, ...rest } = props;
	const className = twMerge(
		"flex rounded-full border-2 border-gray-800 bg-gray-800 p-2 leading-0 font-semibold text-white transition-all hover:bg-transparent hover:text-gray-800",
		extendedClassName,
	);
	return (
		<button className={className} type={"button"} {...rest}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
}
