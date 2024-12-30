import { render, cleanup, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { Tester } from "./TestEditor.js";
import { Tree } from "@/app/Editor/Panes/StructurePane/Tree/Tree.js";

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
		const assignClassForm = await assignNewClass(queryByTestId);
		await act(async () => {
			fireEvent.submit(assignClassForm);
		});
		const pathlists2 = getAllByTestId("path-list");
		const line2 = pathlists2[0].children[0];
		expect(line2).toBeTruthy();
		expect(line2.textContent).toContain("test");
	});

	it("Should allow for classes to be assigned to parents and children", async () => {
		const { getByTestId, queryByTestId } = render(
			<Tester testSVG={`<svg><g><line></line></g></svg>`} Component={Tree} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		await checkNode(getByTestId, 1001);
		await checkNode(getByTestId, 1);
		const assignClassForm = await assignNewClass(queryByTestId);
		const submitButton = assignClassForm?.querySelector("button");
		await act(async () => {
			fireEvent.click(submitButton as HTMLButtonElement);
		});
		const line2 = getByTestId("node-1001");
		expect(line2).toBeTruthy();
		expect(line2.textContent).toContain("test");
		const group2 = getByTestId("node-1");
		expect(group2).toBeTruthy();
		expect(group2.textContent).toContain("test");
	});

	it("Should allow for selected elements to be grouped", async () => {
		const { getByTestId } = render(
			<Tester
				testSVG={`<svg><line></line><line></line></svg>`}
				Component={Tree}
			/>,
		);
		expect(getByTestId("tester")).toBeTruthy();
		await checkNode(getByTestId, 1);
		await checkNode(getByTestId, 2);
		const groupForm = getByTestId("add-group");
		expect(groupForm).toBeTruthy();
		const groupInput = groupForm.querySelector("input") as HTMLInputElement;
		expect(groupInput).toBeTruthy();
		await act(async () => {
			fireEvent.input(groupInput, {
				target: {
					value: "test",
				},
			});
		});
		expect(groupInput.value).toEqual("test");
		await act(async () => {
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

	it("Should allow an empty group to be created", async () => {
		const { getByTestId } = render(
			<Tester testSVG={`<svg></svg>`} Component={Tree} />,
		);
		expect(getByTestId("tester")).toBeTruthy();
		const groupForm = getByTestId("add-group");
		expect(groupForm).toBeTruthy();
		await act(async () => {
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
async function assignNewClass(
	queryByTestId: (testId: string) => HTMLElement | null,
	className = "test",
): Promise<HTMLFormElement> {
	const assignClassForm = queryByTestId("assign-class");
	expect(assignClassForm).toBeTruthy();
	const useExisting = assignClassForm?.querySelector(
		"input[type=checkbox]",
	) as HTMLInputElement;
	expect(useExisting).toBeTruthy();

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
async function checkNode(
	getByTestId: (id: string) => HTMLElement,
	nodeID: number,
) {
	const node = getByTestId(`node-${nodeID}`);
	const input = node.querySelector("input");
	expect(input).toBeTruthy();
	await act(async () => {
		input?.click();
	});
}
