import { describe, expect, it, vi } from "vitest";

import { renameFile } from "@/lib/renameFile.js";

describe("renameFile", () => {
	it("should rename a file", () => {
		const file = {
			file: { contents: "test-1", title: "test-1" },
			previous: [],
			selected: [],
		};
		const setState = vi.fn();
		renameFile("test-2", { stateTuple: [file, setState] });
		expect(setState).toHaveBeenCalledWith({
			file: { contents: "test-1", title: "test-2" },
			previous: [],
			selected: [],
		});
	});
});
