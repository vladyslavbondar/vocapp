import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { VocabularyWord } from "../../types";
import { shufleArray } from "../../utils";
import { useVocabularyState } from "../../hooks";
import { DictationWordCard } from "./DictationWordCard";
import { DictaionResult } from "./DictaionResult";
import { useGetCardById } from "../../api";

export interface DictationVocabularyWord extends VocabularyWord {
	userAnswer: null | string;
}

export function CardDictation() {
	const { cardId } = useParams();
	const { data, isLoading } = useGetCardById(cardId);

	const {
		currentWord,
		updateAndNext,
		haveAllUpdated,
		words,
		resetVocabualryState,
	} = useVocabularyState<DictationVocabularyWord>([]);

	useEffect(() => {
		if (data) {
			resetVocabualryState(converWordListToDictationVocabulary(data.words));
		}
	}, [data, resetVocabualryState]);

	if (isLoading || !currentWord) return <>Loading...</>;

	if (haveAllUpdated) return <DictaionResult dictationResult={words} />;

	return (
		<div className="flex w-full flex-col bg-white rounded-2xl h-full">
			<div className="h-full flex flex-col justify-center items-center">
				<DictationWordCard wordData={currentWord} onSubmit={updateAndNext} />
			</div>
			<div className="flex justify-end p-3 btn-md">
				<button className="btn btn-ghost">Next</button>
			</div>
		</div>
	);
}

function converWordListToDictationVocabulary(
	wordList?: VocabularyWord[]
): DictationVocabularyWord[] {
	if (!wordList) return [];

	return shufleArray(wordList).map((word) => ({ ...word, userAnswer: null }));
}
