import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { VocabularyWord } from "../../types";
import { shufleArray } from "../../utils";
import { LearningWordCard } from "./LearningWordCard";
import { LearnCardResult } from "./LearnCardResult";
import { useVocabularyState } from "../../hooks";
import { useWordsByCardId } from "../../api/cardWords";

export interface LearnVocabularyWord extends VocabularyWord {
	userAnswers: string[];
}

export function LearnCard() {
	const { cardId } = useParams();
	const { data: wordsList, isLoading } = useWordsByCardId(Number(cardId));

	const {
		currentWord,
		words,
		next,
		updateAndNext,
		haveAllUpdated,
		updateWords,
	} = useVocabularyState<LearnVocabularyWord>([]);

	useEffect(() => {
		if (wordsList) {
			updateWords(converWordListToLearnVocabularyWord(wordsList));
		}
	}, [wordsList, updateWords]);

	if (isLoading || !currentWord) return <>Loading...</>;

	if (haveAllUpdated) return <LearnCardResult learnResult={words} />;

	return (
		<div className="flex w-full flex-col bg-white rounded-2xl h-full">
			<div className="h-full flex flex-col justify-center items-center">
				<LearningWordCard
					wordData={currentWord}
					onAnswerComplete={updateAndNext}
				/>
			</div>
			<div className="flex justify-end p-3">
				<button className="btn btn-ghost btn-md" onClick={next}>
					Next
				</button>
			</div>
		</div>
	);
}

function converWordListToLearnVocabularyWord(
	wordList?: VocabularyWord[]
): LearnVocabularyWord[] {
	if (!wordList) return [];

	return shufleArray(wordList).map((word) => ({ ...word, userAnswers: [] }));
}
