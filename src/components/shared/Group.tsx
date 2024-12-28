import React, {
	type FormHTMLAttributes,
	type HTMLAttributes,
	type ReactElement,
} from "react";
import { twMerge } from "tailwind-merge";

type Props<T extends "div" | "form" = "div"> = T extends "div"
	? HTMLAttributes<HTMLDivElement> & { element?: T }
	: FormHTMLAttributes<HTMLFormElement> & { element: T };
/**
 * A group of elements.
 *
 * @template T The element type.
 * @param props The props for the component.
 * @returns The component.
 */
export default function Group<T extends "div" | "form" = "div">(
	props: Props<T>,
): ReactElement {
	const { className: extendedClassName } = props;
	const className = twMerge(
		"flex flex-col items-start gap-4 border-2 border-black rounded-xl p-4 mb-4",
		extendedClassName,
	);

	if (props.element === "form") {
		return <form {...props} className={className} />;
	} else {
		return <div {...props} className={className} />;
	}
}
