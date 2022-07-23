import React, { useEffect, useState } from 'react';

interface IProps {
	containerRef: React.RefObject<HTMLDivElement>;
	svgHTML: string;
}
function PreviewPane(props: IProps) {
	const { containerRef, svgHTML } = props;
	const [base64, setBase64] = useState('');

	useEffect(() => {
		setBase64(window.btoa(svgHTML));
	}, [svgHTML]);

	return (
		<div>
			<h2>Preview</h2>
			<h3>&lt;svg&gt;</h3>
			<div
				ref={containerRef}
				dangerouslySetInnerHTML={{ __html: svgHTML }}
			></div>
			<h3>&lt;img&gt;</h3>
			<img src={'data:image/svg+xml;base64,' + base64} alt="preview" />
		</div>
	);
}

export default PreviewPane;
