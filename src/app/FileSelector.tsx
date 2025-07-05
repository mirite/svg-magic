import type { ChangeEvent, FormEvent, ReactElement } from "react";

import React, { useState } from "react";

import type { IFile } from "@/lib/types.js";

import Button from "@/app/shared/Button.js";

type FileSelectorState = {
	file: IFile;
};

type Props = {
	onSelect: (file: IFile) => void;
};

/**
 * Allows for the selection of an SVG file.
 *
 * @param props The callback for file selection.
 * @returns The component.
 */
function FileSelector(props: Props): ReactElement {
	const [state, setState] = useState<FileSelectorState>();
	/**
	 * Handle the form submission.
	 *
	 * @param e The form event.
	 */
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (state?.file) {
			props.onSelect(state.file);
		}
	};

	/**
	 * Handle the file selection.
	 *
	 * @param e The change event.
	 */
	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		const rawFileFromInput = files?.item(0);
		const contents = await rawFileFromInput?.text();
		const title = rawFileFromInput?.name;
		if (title && contents) {
			const file = { contents, title };
			setState({ file });
		}
	};

	return (
		<div className={"flex min-h-dvh flex-col justify-center gap-4 text-center"}>
			<p>Select an SVG file to get started.</p>
			<form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
				<label htmlFor="file-selector">File: </label>
				<input
					accept="image/svg+xml"
					className={"cursor-pointer"}
					id="file-selector"
					onChange={(e) => {
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						handleChange(e);
					}}
					required
					type="file"
				/>
				<Button type={"submit"}>Load</Button>
			</form>
			<a
				href="https://github.com/mirite/svg-magic"
				rel="noreferrer"
				target="_blank"
			>
				View On GitHub
			</a>
			<p>
				<em>Version {__APP_VERSION__}</em>
			</p>
		</div>
	);
}

export default FileSelector;
