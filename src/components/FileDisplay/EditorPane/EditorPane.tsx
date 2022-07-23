import React from 'react';

interface IProps {
	svgHTML: string;
	onChange: (newValue: string) => void;
}

function EditorPane(props: IProps) {
	const { svgHTML, onChange } = props;
	return (
		<div>
			<h2>Raw</h2>
			<label>
				Markup:
				<br />
				<textarea
					value={svgHTML}
					onChange={(e) => onChange(e.currentTarget.value)}
					rows={svgHTML.split('\n').length}
				></textarea>
			</label>
		</div>
	);
}

export default EditorPane;
