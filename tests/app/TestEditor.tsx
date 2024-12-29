import type { ReactElement } from "react";
import { useEffect } from "react";

import type { PaneComponent, PaneSubComponent } from "@/lib/types.js";
import { useEditor } from "@/lib/useEditor.js";

/**
 * A test component for panes and sub-panes.
 *
 * @param props The component props.
 * @param props.testSVG The SVG to test
 * @param props.Component The component to test
 * @returns The rendered component.
 */
export function Tester(props: {
	testSVG: string;
	Component: PaneComponent | PaneSubComponent;
}): ReactElement | null {
	const { testSVG, Component } = props;
	const { getCurrentFile, handleCurrentFileUpdate, handleFileOpen } =
		useEditor();
	useEffect(() => {
		handleFileOpen({ title: "test.svg", contents: testSVG });
		// eslint-disable-next-line react-hooks/exhaustive-deps -- Only run once
	}, []);
	const currentFile = getCurrentFile();
	if (!currentFile) return null;
	return (
		<div data-testid={"tester"}>
			<Component stateTuple={[currentFile, handleCurrentFileUpdate]} />
		</div>
	);
}
