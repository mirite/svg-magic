/**
 * Save the SVG content to a file.
 *
 * @param workingSVG The SVG content to save.
 * @param fileName The name of the file to save.
 */
export function saveFile(
	workingSVG: string,
	fileName: string = "magic.svg",
): void {
	const element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(workingSVG),
	);
	element.setAttribute("download", fileName);

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
