import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Tester } from "./TestEditor.js";

import { Tree } from "@/components/Editor/Panes/StructurePane/Tree/Tree.js";

describe("<Tree>", () => {
	it("should handle an empty tree", () => {
		const { getByTestId } = render(
			<Tester testSVG={`<svg></svg>`} Component={Tree} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
	});
});
