import { describe, it, expect, vi } from "vitest";

import { renameFile } from "@/lib/renameFile.js";

describe("renameFile", () => {
	it("should rename a file", () => {
		const file = {
			file: { title: "test-1", contents: "test-1" },
			previous: [],
			selected: [],
		};
		const setState = vi.fn();
		renameFile("test-2", { stateTuple: [file, setState] });
		expect(setState).toHaveBeenCalledWith({
			file: { title: "test-2", contents: "test-1" },
			previous: [],
		});
		expect(file.file.title).toBe("test-1");
	});
});
