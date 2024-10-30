import type { ReactElement, ChangeEvent, FormEvent } from "react";
import React, { Component } from "react";
import type { IFile } from "types";

interface IProps {
	onSelect: (file: IFile) => void;
}

interface IState {
	file: IFile;
}

/** Allows for the selection of an SVG file. */
class FileSelector extends Component<IProps, IState> {
	/**
	 * Render the component.
	 *
	 * @returns The rendered component.
	 */
	render(): ReactElement {
		return (
			<div
				className={"flex text-center flex-col gap-4 min-h-dvh justify-center"}
			>
				<h1>SVG Magic</h1>
				<p>Select an SVG file to get started.</p>
				<form onSubmit={(e: React.FormEvent) => this.handleSubmit(e)}>
					<label htmlFor="file-selector">File: </label>
					<input
						type="file"
						onChange={(e) => this.handleChange(e)}
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

	/**
	 * Handle the form submission.
	 *
	 * @param e The form event.
	 */
	private handleSubmit(e: FormEvent) {
		e.preventDefault();
		const { file } = this.state;
		if (file) {
			this.props.onSelect(file);
		}
	}

	/**
	 * Handle the file selection.
	 *
	 * @param e The change event.
	 */
	private async handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		const rawFileFromInput = files?.item(0);
		const contents = await rawFileFromInput?.text();
		const title = rawFileFromInput?.name;
		if (title && contents) {
			const file = { contents, title };
			this.setState({ file });
		}
	}
}

export default FileSelector;
