import React, { Component } from "react";
import type { IFile } from "types";

import styles from "./FileSelector.module.css";

interface IProps {
	onSelect: (file: IFile) => void;
}

interface IState {
	file: IFile;
}

/**
 *
 */
class FileSelector extends Component<IProps, IState> {
	/**
	 *
	 */
	render() {
		return (
			<div className={styles.container}>
				<h1>SVG Magic</h1>
				<p>Select an SVG file to get started.</p>
				<form onSubmit={(e: React.FormEvent) => this.handleSubmit(e)}>
					<label htmlFor="file-selector">File: </label>
					<input
						type="file"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							this.handleChange(e)
						}
						id="file-selector"
						accept="image/svg+xml"
						required
					/>
					<button>Load</button>
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

	/** @param e */
	private handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const { file } = this.state;
		if (file) {
			this.props.onSelect(file);
		}
	}

	/** @param e */
	private async handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
