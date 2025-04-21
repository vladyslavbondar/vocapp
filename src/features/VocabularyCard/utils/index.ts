import { VocabularyWord } from "../../../types";

export type ValidationFn = (value?: unknown) => null | string;

export type VocabularyWordProp = keyof Omit<VocabularyWord, "id">;

export interface WordFormFieldDefenition {
	name: VocabularyWordProp;
	label: string;
	required: boolean;
	validations: ValidationFn[];
}

export const wordCardFieldDefenitions: WordFormFieldDefenition[] = [
	{
		name: "originalWord",
		label: "Original word",
		required: true,
		validations: [
			(value?: unknown) => (value ? null : "Original word is required"),
		],
	},
	{
		name: "translations",
		label: "Translations",
		required: true,
		validations: [
			(value?: unknown) => (value ? null : "Translation is required"),
		],
	},
	{
		name: "note",
		label: "Note",
		required: false,
		validations: [],
	},
];
