/**
 * Find the classes used in the SVG
 *
 * @param element The element to check
 * @param existing The classes already found
 * @returns The classes found.
 */
export function getClasses(
	element: Element,
	existing?: Set<string>
): string[] {
	const localExistingRef = existing ?? new Set<string>();
	for (const c of element.classList) {
		localExistingRef.add(c);
	}
	for (const child of element.children) {
		getClasses(child, localExistingRef);
	}
	return Array.from(localExistingRef);
}
