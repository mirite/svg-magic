import React from 'react';

interface IProps {
	svgHTML: string;
	onChange: (newValue: string) => void;
}

function EditorPane(props: IProps) {
	const { svgHTML, onChange } = props;
	return (
		<textarea
			value={svgHTML}
			onChange={(e) => onChange(e.currentTarget.value)}
		></textarea>
	);
}

export default EditorPane;
