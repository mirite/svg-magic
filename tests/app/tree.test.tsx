import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { Tree } from "@/app/Editor/Panes/StructurePane/Tree/Tree.js";

import { Tester } from "./TestEditor.js";

describe("<Tree>", () => {
	beforeEach(() => {
		cleanup();
	});
	it("should handle an empty tree", () => {
		const { getByTestId } = render(
			<Tester Component={Tree} testSVG={`<svg></svg>`} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlist = getByTestId("path-list");
		expect(pathlist.children.length).toEqual(0);
	});

	it("should handle a flat tree", () => {
		const { getByTestId } = render(
			<Tester
				Component={Tree}
				testSVG={`<svg><line></line><line></line></svg>`}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlist = getByTestId("path-list");
		expect(pathlist.children.length).toEqual(2);
	});

	it("should handle a mixed tree", () => {
		const { getAllByTestId, getByTestId } = render(
			<Tester
				Component={Tree}
				testSVG={`<svg><g><line></line></g><line></line></svg>`}
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
		act(() => {
			checkbox?.click();
		});
		expect(checkbox?.checked).toBeTruthy();

		act(() => {
			checkbox?.click();
		});
		expect(checkbox?.checked).toBeFalsy();
	});

	it("Should allow for classes to be assigned", () => {
		const { getAllByTestId, getByTestId, queryByTestId } = render(
			<Tester
				Component={Tree}
				testSVG={`<svg><g><line></line></g><line></line></svg>`}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const pathlists = getAllByTestId("path-list");
		const line = pathlists[0].children[0];
		const input = line.querySelector("input");
		expect(queryByTestId("assign-class")).toBeFalsy();
		act(() => {
			input?.click();
		});
		const assignClassForm = assignNewClass(queryByTestId);
		act(() => {
			fireEvent.submit(assignClassForm);
		});
		const pathlists2 = getAllByTestId("path-list");
		const line2 = pathlists2[0].children[0];
		expect(line2).toBeTruthy();
		expect(line2.textContent).toContain("test");
	});

	it("Should allow for classes to be assigned to parents and children", () => {
		const { getByTestId, queryByTestId } = render(
			<Tester Component={Tree} testSVG={`<svg><g><line></line></g></svg>`} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		checkNode(getByTestId, 1001);
		checkNode(getByTestId, 1);
		const assignClassForm = assignNewClass(queryByTestId);
		const submitButton = assignClassForm?.querySelector("button");
		act(() => {
			fireEvent.click(submitButton as HTMLButtonElement);
		});
		const line2 = getByTestId("node-1001");
		expect(line2).toBeTruthy();
		expect(line2.textContent).toContain("test");
		const group2 = getByTestId("node-1");
		expect(group2).toBeTruthy();
		expect(group2.textContent).toContain("test");
	});

	it("Should allow for selected elements to be grouped", () => {
		const { getByTestId } = render(
			<Tester
				Component={Tree}
				testSVG={`<svg><line></line><line></line></svg>`}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		checkNode(getByTestId, 1);
		checkNode(getByTestId, 2);
		const groupForm = getByTestId("add-group");
		expect(groupForm).toBeTruthy();
		const groupInput = groupForm.querySelector("input") as HTMLInputElement;
		expect(groupInput).toBeTruthy();
		act(() => {
			fireEvent.input(groupInput, {
				target: {
					value: "test",
				},
			});
		});
		expect(groupInput.value).toEqual("test");
		act(() => {
			fireEvent.submit(groupForm);
		});
		const group = getByTestId("node-1");
		expect(group).toBeTruthy();
		expect(group.textContent).toContain("test");
		const groupChildA = getByTestId("node-1001");
		expect(groupChildA).toBeTruthy();
		const groupChildB = getByTestId("node-1002");
		expect(groupChildB).toBeTruthy();
	});

	it("Should allow an empty group to be created", () => {
		const { getByTestId } = render(
			<Tester Component={Tree} testSVG={`<svg></svg>`} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const groupForm = getByTestId("add-group");
		expect(groupForm).toBeTruthy();
		act(() => {
			fireEvent.submit(groupForm);
		});
		const group = getByTestId("node-1");
		expect(group).toBeTruthy();
		expect(group.querySelector("ul")).toEqual(null);
	});
});

/**
 * Assign a new class to the selected elements.
 *
 * @param queryByTestId The queryByTestId function.
 * @param className The class name to assign.
 * @returns The form element to allow for different submission methods and
 *   testing.
 */
function assignNewClass(
	queryByTestId: (testId: string) => HTMLElement | null,
	className = "test",
): HTMLFormElement {
	const assignClassForm = queryByTestId("assign-class");
	expect(assignClassForm).toBeTruthy();
	const useExisting = assignClassForm?.querySelector(
		"input[type=checkbox]",
	) as HTMLInputElement;
	expect(useExisting).toBeTruthy();

	act(() => {
		useExisting?.click();
	});
	expect(useExisting.checked).toBeFalsy();
	const textInput = assignClassForm?.querySelector(
		"input[type=text]",
	) as HTMLInputElement;
	expect(textInput).toBeTruthy();
	act(() => {
		fireEvent.input(textInput, {
			target: {
				value: className,
			},
		});
	});
	expect(textInput.value).toEqual(className);
	return assignClassForm as HTMLFormElement;
}

/**
 * Toggle the checkbox for a node.
 *
 * @param getByTestId The getByTestId function.
 * @param nodeID The ID of the node to toggle.
 */
function checkNode(getByTestId: (id: string) => HTMLElement, nodeID: number) {
	const node = getByTestId(`node-${nodeID}`);
	const input = node.querySelector("input");
	expect(input).toBeTruthy();
	act(() => {
		input?.click();
	});
}
