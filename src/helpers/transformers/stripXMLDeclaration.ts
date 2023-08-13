export function stripXMLDeclaration(svgElem: string) {
  return svgElem.replace(/<\?xml.+\?>/gi, "").trim();
}
