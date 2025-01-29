import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonHTMLAttributes, ReactElement } from "react";
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
		"rounded-full border-gray-800 flex p-2 border-2 leading-0 font-semibold bg-gray-800 text-white hover:bg-transparent hover:text-gray-800 transition-all",
		extendedClassName,
	);
	return (
		<button className={className} type={"button"} {...rest}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
}
