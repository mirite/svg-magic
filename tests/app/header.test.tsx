import { act, fireEvent, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Header } from "@/app/Header.js";

describe("<Header />", () => {
	it("should render the header", async () => {
		const close1 = vi.fn();
		const close2 = vi.fn();
		const switchTo1 = vi.fn();
		const switchTo2 = vi.fn();
		const goHome = vi.fn();
		const openFile = {
			file: { title: "test", contents: "test" },
			previous: [],
		};
		const { getByText, getByTestId } = render(
			<Header
				openFiles={[
					{
						file: openFile,
						close: close1,
						switchTo: switchTo1,
					},
					{
						file: { file: { title: "test2", contents: "test" }, previous: [] },
						close: close2,
						switchTo: switchTo2,
					},
				]}
				currentFile={openFile}
				goHome={goHome}
			/>,
		);
		const title = getByText("SVG Magic");
		expect(title).toBeTruthy();
		await act(async () => {
			fireEvent.click(title);
		});
		expect(goHome).toHaveBeenCalled();
		const file1 = getByText("test");
		expect(file1).toBeTruthy();
		await act(async () => {
			fireEvent.click(file1);
		});
		expect(switchTo1).not.toHaveBeenCalled();
		const file2 = getByText("test2");
		expect(file2).toBeTruthy();
		await act(async () => {
			fireEvent.click(file2);
		});
		expect(switchTo2).toHaveBeenCalled();
		const close1Button = getByTestId("open-file-test").querySelector(
			"button[title='Close']",
		);
		expect(close1Button).toBeTruthy();
		await act(async () => {
			fireEvent.click(close1Button!);
		});
		expect(close1).toHaveBeenCalled();
	});
});
