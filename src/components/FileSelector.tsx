import type { ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";
import type { IFile } from "types";

type Props = {
	onSelect: (file: IFile) => void;
};

type FileSelectorState = {
	file: IFile;
};

/**
 * Allows for the selection of an SVG file.
 *
 * @param props
 */
function FileSelector(props: Props) {
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
		<div className={"flex text-center flex-col gap-4 min-h-dvh justify-center"}>
			<h1>SVG Magic</h1>
			<p>Select an SVG file to get started.</p>
			<form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
				<label htmlFor="file-selector">File: </label>
				<input
					type="file"
					onChange={(e) => handleChange(e)}
					id="file-selector"
					accept="image/svg+xml"
					required
					className={"cursor-pointer"}
				/>
				<button type={"submit"}>Load</button>
			</form>
			<a
				href="https://github.com/mirite/svg-magic"
				target="_blank"
				rel="noreferrer"
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
