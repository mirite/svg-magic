import React from 'react';

export function setTagContent(
	ref: React.MutableRefObject<HTMLElement | null>,
	content: string
) {
	if (ref?.current) {
		ref.current.innerHTML = content;
	}
}
