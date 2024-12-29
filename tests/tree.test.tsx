import { render, cleanup, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { Tester } from "./TestEditor.js";

import { Tree } from "@/components/Editor/Panes/StructurePane/Tree/Tree.js";

describe("<Tree>", () => {
	beforeEach(() => {
		cleanup();
	});
	it("should handle an empty tree", () => {
		const { getByTestId } = render(
			<Tester testSVG={`<svg></svg>`} Component={Tree} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlist = getByTestId("path-list");
		expect(pathlist.children.length).toEqual(0);
	});

	it("should handle a flat tree", () => {
		const { getByTestId } = render(
			<Tester
				testSVG={`<svg><line></line><line></line></svg>`}
				Component={Tree}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlist = getByTestId("path-list");
		expect(pathlist.children.length).toEqual(2);
	});

	it("should handle a mixed tree", async () => {
		const { getByTestId, getAllByTestId } = render(
			<Tester
				testSVG={`<svg><g><line></line></g><line></line></svg>`}
				Component={Tree}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlists = getAllByTestId("path-list");
		expect(pathlists.length).toEqual(2);
		const pathlist = getAllByTestId("path-list")[0];
		expect(pathlist.children.length).toEqual(2);
		const pathlist2 = getAllByTestId("path-list")[1];
		expect(pathlist2.children.length).toEqual(1);
		const checkbox = pathlist2.children[0].querySelector("input");
		expect(checkbox).toBeTruthy();
		await act(async () => {
			checkbox?.click();
		});
		expect(checkbox?.checked).toBeTruthy();
	});
});
