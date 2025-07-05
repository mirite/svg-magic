import type { PropsWithChildren, ReactElement } from "react";

type Props = PropsWithChildren;

/**
 * A standardized wrapper for inputs
 *
 * @param props The Component children
 * @returns The component
 */
export function InputWrapper(props: Props): ReactElement {
	return <div className="flex items-center gap-2">{props.children}</div>;
}
