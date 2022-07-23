import React, { Component } from 'react';

import styles from './FileSelector.module.css';

interface IProps {
	onSelect: (fileContent: string) => void;
}

interface IState {
	fileContents: string;
}

class FileSelector extends Component<IProps, IState> {
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
			</div>
		);
	}

	private handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const { fileContents } = this.state;
		if (fileContents) {
			this.props.onSelect(fileContents);
		}
	}

	private async handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { files } = e.target;
		const file = files?.item(0);
		const fileContents = await file?.text();
		if (fileContents) {
			this.setState({ fileContents });
		}
	}
}

export default FileSelector;
