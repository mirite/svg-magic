import type { PropsWithChildren, ReactElement } from "react";

type Props = PropsWithChildren;

/**
 * A standardized wrapper for inputs
 *
 * @param props The Component children
 * @returns The component
 */
export function InputWrapper(props: Props): ReactElement {
	return <div className="flex gap-2 items-center">{props.children}</div>;
}
