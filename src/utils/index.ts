export function getRandomNumberInRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function shufleArray<T>(array: T[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
