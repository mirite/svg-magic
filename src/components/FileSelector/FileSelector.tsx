import React, { Component } from 'react';
import _ from 'lodash';

interface IProps {
	onSelect: (fileContent: string) => void;
}

interface IState {
	fileContents: string;
}

class FileSelector extends Component<IProps, IState> {
	private id: string = _.uniqueId('fileSelector-');

	render() {
		return (
			<form onSubmit={(e: React.FormEvent) => this.handleSubmit(e)}>
				<label htmlFor={this.id}>File: </label>
				<input
					type="file"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						this.handleChange(e)
					}
					id={this.id}
					accept="image/svg+xml"
					required
				/>
				<button>Load</button>
			</form>
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
