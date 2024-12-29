/**
 * Generate a unique ID for a node based on its position in the tree.
 *
 * @param currentIndex The current index of the node relative to its siblings.
 * @param parentIndex The index of the parent node.
 * @returns The generated ID.
 */
export function generateID(currentIndex: number, parentIndex: number): number {
	return parentIndex * 1000 + currentIndex + 1;
}
