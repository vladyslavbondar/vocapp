import { useState, useCallback } from "react";
import { VocabularyWord } from "../types";
import { shufleArray } from "../utils";

// const mockkedWords: any = [
// 	{
// 		translations: "креста",
// 		id: "40b07439-d1f3-47f7-9760-23efbaca8a46",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "club",
// 		userAnswer: "xlub",
// 	},
// 	{
// 		translations: "подчеркнуть, подчеркивать, отметить",
// 		id: "5ae8efc4-61ec-4e9b-89bb-4439dbfb41ca",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "emphasise",
// 		userAnswer: "empxasise",
// 	},
// 	{
// 		translations: "бубна",
// 		id: "39c1523a-ab81-4a20-b96b-4d3a0cede9fc",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "diamond",
// 		userAnswer: "diamonx",
// 	},
// 	{
// 		translations: "пика",
// 		id: "c2b64a53-ed41-43e9-8618-7b1261ab4b91",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "spade",
// 		userAnswer: "spxxe",
// 	},
// 	{
// 		note: "",
// 		translations: "признать признавать подтверждать отметить осознать ",
// 		id: "9b56256d-4e4d-4c12-bae3-685eec41b5ee",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "acknowledge",
// 		userAnswer: "acxnowlxdge",
// 	},
// 	{
// 		translations: "лишить тебя, отнять у тебя",
// 		id: "4f1e8753-3695-4d56-91d5-ea1aa293d686",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "rob you of",
// 		userAnswer: "rob xxu oxx",
// 	},

// 	{
// 		translations: "лишить тебя, отнять у тебя",
// 		id: "4f1e8753-3695-4d56-91d5-ea1aa293d686",
// 		cardId: "42b125e1-473e-4955-887a-b27010abae66",
// 		originalWord: "rob you of",
// 		userAnswer: "rob you of",
// 	},
// ];

export function useVocabularyState<T extends VocabularyWord>(
	initialWords?: T[]
) {
	const [words, setWords] = useState<T[]>(initialWords || []);
	const [wordIndex, setWordIndex] = useState(0);
	const [haveAllUpdated, setHaveAllUpdate] = useState(true);

	const wordsLength = words.length;
	const currentWord = words[wordIndex];
	const isLastElement = wordIndex === wordsLength - 1;

	const next = useCallback(() => {
		setWordIndex((prevWordIndex) =>
			prevWordIndex + 1 >= wordsLength ? prevWordIndex : prevWordIndex + 1
		);
	}, [wordsLength]);

	const previous = useCallback(() => {
		setWordIndex((prevLearningWordIndex) =>
			prevLearningWordIndex - 1 < 0
				? prevLearningWordIndex
				: prevLearningWordIndex - 1
		);
	}, []);

	const updateWord = useCallback((updatedWord: T) => {
		setWords((prevWords) =>
			prevWords.map((prevWord) =>
				prevWord.id === updatedWord.id ? updatedWord : prevWord
			)
		);
	}, []);

	const resetVocabualryState = useCallback((newWords: T[]) => {
		setWords(shufleArray(newWords));
		setWordIndex(0);
		setHaveAllUpdate(false);
	}, []);

	const updateAndNext = useCallback(
		(updatedWord: T) => {
			updateWord(updatedWord);

			if (isLastElement) {
				setHaveAllUpdate(true);

				return;
			}

			next();
		},
		[updateWord, next, isLastElement]
	);

	return {
		currentWord,
		words,
		updateAndNext,
		next,
		previous,
		updateWord,
		resetVocabualryState,
		isLastElement,
		haveAllUpdated,
	};
}
