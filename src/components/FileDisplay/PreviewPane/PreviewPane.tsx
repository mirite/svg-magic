import React from 'react';

interface IProps {
	containerRef: React.RefObject<HTMLDivElement>;
	svgHTML: string;
}
function PreviewPane(props: IProps) {
	const { containerRef, svgHTML } = props;
	return (
		<div
			ref={containerRef}
			dangerouslySetInnerHTML={{ __html: svgHTML }}
		></div>
	);
}

export default PreviewPane;
