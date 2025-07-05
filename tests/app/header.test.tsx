import { act, fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/app/Header.js";

describe("<Header />", () => {
	it("should render the header", () => {
		const close1 = vi.fn();
		const close2 = vi.fn();
		const switchTo1 = vi.fn();
		const switchTo2 = vi.fn();
		const goHome = vi.fn();
		const openFile = {
			file: { contents: "test", title: "test" },
			previous: [],
			selected: [],
		};
		const { getByTestId, getByText } = render(
			<Header
				currentFile={openFile}
				goHome={goHome}
				openFiles={[
					{
						close: close1,
						file: openFile,
						switchTo: switchTo1,
					},
					{
						close: close2,
						file: {
							file: { contents: "test", title: "test2" },
							previous: [],
							selected: [],
						},
						switchTo: switchTo2,
					},
				]}
			/>,
		);
		const title = getByText("SVG Magic");
		expect(title).toBeTruthy();
		act(() => {
			fireEvent.click(title);
		});
		expect(goHome).toHaveBeenCalled();
		const file1 = getByText("test");
		expect(file1).toBeTruthy();
		act(() => {
			fireEvent.click(file1);
		});
		expect(switchTo1).not.toHaveBeenCalled();
		const file2 = getByText("test2");
		expect(file2).toBeTruthy();
		act(() => {
			fireEvent.click(file2);
		});
		expect(switchTo2).toHaveBeenCalled();
		const close1Button = getByTestId("open-file-test").querySelector(
			"button[title='Close']",
		);
		expect(close1Button).toBeTruthy();
		act(() => {
			fireEvent.click(close1Button!);
		});
		expect(close1).toHaveBeenCalled();
	});
});
