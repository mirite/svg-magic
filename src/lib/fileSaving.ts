/**
 * @param workingSVG
 * @param fileName
 */
export function saveFile(workingSVG: string, fileName: string = "magic.svg") {
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
