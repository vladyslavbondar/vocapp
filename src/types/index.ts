export interface VocabularyWord {
	id: number;
	originalWord: string;
	translations: string;
	note?: string;
}

export interface CardInfo {
	id: number;
	name: string;
	dateCreated: string;
	progress: number;
}

export interface VocabularyCard extends CardInfo {
	words: VocabularyWord[];
}
