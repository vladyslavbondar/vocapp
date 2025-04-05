import { useState, useCallback } from "react";
import { VocabularyWord } from "../types";
import { shufleArray } from "../utils";

export function useVocabularyState<T extends VocabularyWord>(
	initialWords?: T[]
) {
	const [words, setWords] = useState<T[]>(
		initialWords ? shufleArray(initialWords) : []
	);
	const [wordIndex, setWordIndex] = useState(0);
	const [haveAllUpdated, setHaveAllUpdate] = useState(false);

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
