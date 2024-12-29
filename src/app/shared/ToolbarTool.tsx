import type { PropsWithChildren, ReactElement } from "react";

import Button from "@/app/shared/Button.js";

type Props = PropsWithChildren<{
	onClick: () => void;
}>;

/**
 *
 *
 * @param props The props for the component.
 * @returns The component.
 */
export default function ToolbarTool(props: Props): ReactElement {
	return <Button onClick={props.onClick}>{props.children}</Button>;
}
