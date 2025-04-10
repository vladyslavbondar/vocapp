import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { VocabularyCard, VocabularyWord } from "../types";
import { wordStore } from "./mockData";
import { getRandomNumberInRange } from "../utils";

const VOCABULARY_CARD_API_PATH = "/card";

const fetchVocabularyCard = async (
	cardId: number
): Promise<VocabularyCard[]> => {
	const response = await fetch(
		`${
			import.meta.env.VITE_VOCAPP_REST_API
		}${VOCABULARY_CARD_API_PATH}/${cardId}`
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const vocabularyCard = await response.json();

	return vocabularyCard;
};

export const useWordsByCardId = (cardId: number) => {
	return useQuery({
		queryKey: ["words", cardId], // words.0: [{}, {}, {}]
		queryFn: () => fetchVocabularyCard(cardId),
		enabled: !!cardId, // Prevents execution if cardId is undefined/null
	});
};

export const updateWordById = async (
	cardId: number,
	word: VocabularyWord
): Promise<VocabularyWord> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const cardIndex = wordStore.findIndex((card) => card.id === cardId);
			if (cardIndex === -1) throw new Error("Failed to update words");

			const card = wordStore[cardIndex];
			const wordInStore = card.words.find(
				(wordItem: VocabularyWord) => wordItem.id === word.id
			);

			if (!wordInStore) throw new Error("Could not Find word to update");

			wordStore[cardIndex] = {
				...card,
				words: card.words.map((wordItem: VocabularyWord) =>
					wordItem.id === word.id ? word : wordItem
				),
			};
			// In a real app, this would be an API call
			// For now, we'll just simulate success
			resolve(word);
		}, getRandomNumberInRange(500, 1000));
	});
};

export const useUpdateWordById = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			cardId,
			word,
		}: {
			cardId: number;
			word: VocabularyWord;
		}) => updateWordById(cardId, word),
		onMutate: async ({ cardId, word }) => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["words", cardId] });

			// Snapshot the previous value
			const previousWords = queryClient.getQueryData<VocabularyWord[]>([
				"words",
				cardId,
			]);

			// Optimistically update to the new value
			queryClient.setQueryData<VocabularyWord[]>(
				["words", cardId],
				(oldData) => {
					if (!oldData) return [word];
					return oldData.map((w) => (w.id === word.id ? word : w));
				}
			);

			// Return context with the snapshotted value
			return { previousWords };
		},
		onError: (err, { cardId }, context) => {
			// Revert to the previous value if there's an error
			if (context?.previousWords) {
				queryClient.setQueryData(["words", cardId], context.previousWords);
			}
		},

		// onSuccess: (updatedWord, { cardId }) => {
		// 	queryClient.setQueryData<VocabularyWord[]>(
		// 		["words", cardId],
		// 		(oldData) => {
		// 			if (!oldData) return [updatedWord];
		// 			return oldData.map((word) =>
		// 				word.id === updatedWord.id ? updatedWord : word
		// 			);
		// 		}
		// 	);
		// },
	});
};

export const createWordById = async (
	cardId: number,
	word: Omit<VocabularyWord, "id">
): Promise<VocabularyWord> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const cardIndex = wordStore.findIndex((card) => card.id === cardId);
			if (cardIndex === -1) throw new Error("Failed to create word");

			const card = wordStore[cardIndex];
			const newWord = {
				...word,
				id: Math.max(...card.words.map((w: VocabularyWord) => w.id), 0) + 1,
			};

			wordStore[cardIndex] = {
				...card,
				words: [newWord, ...card.words],
			};
			resolve(newWord);
		}, 500);
	});
};

export const useCreateWordById = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			cardId,
			word,
		}: {
			cardId: number;
			word: Omit<VocabularyWord, "id">;
		}) => createWordById(cardId, word),
		onMutate: async ({ cardId, word }) => {
			await queryClient.cancelQueries({ queryKey: ["words", cardId] });

			const previousWords = queryClient.getQueryData<VocabularyWord[]>([
				"words",
				cardId,
			]);

			// Optimistically add the new word
			queryClient.setQueryData<VocabularyWord[]>(
				["words", cardId],
				(oldData) => {
					if (!oldData) return [{ ...word, id: Date.now() }];
					return [{ ...word, id: Date.now() }, ...oldData];
				}
			);

			return { previousWords };
		},
		onError: (err, { cardId }, context) => {
			if (context?.previousWords) {
				queryClient.setQueryData(["words", cardId], context.previousWords);
			}
		},
		onSuccess: (newWord, { cardId }) => {
			queryClient.setQueryData<VocabularyWord[]>(
				["words", cardId],
				(oldData) => {
					if (!oldData) return [newWord];
					return oldData.map((word) =>
						word.id === Date.now() ? newWord : word
					);
				}
			);
		},
	});
};
