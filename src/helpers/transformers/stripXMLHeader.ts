export function stripXMLHeader(svgElem: string) {
	return svgElem.replace(/<\?xml.+\?>/gi, '').trim();
}
