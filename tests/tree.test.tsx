import { render, cleanup, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { Tree } from "@/components/Editor/Panes/StructurePane/Tree/Tree.js";

import { Tester } from "./TestEditor.js";


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

		await act(async () => {
			checkbox?.click();
		});
		expect(checkbox?.checked).toBeFalsy();
	});

	it("Should allow for classes to be assigned", async () => {
		const { getByTestId, getAllByTestId, queryByTestId } = render(
			<Tester
				testSVG={`<svg><g><line></line></g><line></line></svg>`}
				Component={Tree}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlists = getAllByTestId("path-list");
		const line = pathlists[0].children[0];
		const input = line.querySelector("input");
		expect(queryByTestId("assign-class")).toBeFalsy();
		await act(async () => {
			input?.click();
		});
		const assignClassForm = queryByTestId("assign-class");
		expect(assignClassForm).toBeTruthy();
		const useExisting = assignClassForm?.querySelector(
			"input[type=checkbox]",
		) as HTMLInputElement;
		expect(useExisting).toBeTruthy();
		expect(useExisting.checked).toBeTruthy();
		await act(async () => {
			useExisting?.click();
		});
		expect(useExisting.checked).toBeFalsy();
		const textInput = assignClassForm?.querySelector(
			"input[type=text]",
		) as HTMLInputElement;
		expect(textInput).toBeTruthy();
		await act(async () => {
			fireEvent.input(textInput, {
				target: {
					value: "test",
				},
			});
		});
		expect(textInput.value).toEqual("test");
		await act(async () => {
			fireEvent.submit(assignClassForm as HTMLFormElement);
		});
		const pathlists2 = getAllByTestId("path-list");
		const line2 = pathlists2[0].children[0];
		expect(line2).toBeTruthy();
		expect(line2.textContent).toContain("test");
	});
});
