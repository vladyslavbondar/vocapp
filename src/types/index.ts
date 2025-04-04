export interface VocabularyWord {
	id: number;
	originalWord: string;
	translations: string;
	note?: string;
}

export interface Card {
	id: number;
	name: string;
	dateCreated: string;
	progress: number;
}
