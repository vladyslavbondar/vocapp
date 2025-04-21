export interface VocabularyWord {
	id: string;
	originalWord: string;
	translations: string;
	note?: string;
	dateCreated: string;
}

export interface CardInfo {
	id: string;
	title: string;
	dateCreated: string;
	progress: number;
}

export interface VocabularyCard extends CardInfo {
	words: VocabularyWord[];
}
