import clsx from "clsx";
import { useMemo } from "react";

import { DictationVocabularyWord } from "./CardDictation";

interface DictaionResultProps {
	dictationResult: DictationVocabularyWord[];
}

interface WordComparison {
	isCorrect: boolean;
	differences: Array<{
		char: string;
		isDifferent: boolean;
	}>;
}

export function DictaionResult({ dictationResult }: DictaionResultProps) {
	const results = useMemo(() => {
		return dictationResult.map((word) => ({
			...word,
			comparison: compareWords(word.originalWord, word.userAnswer),
		}));
	}, [dictationResult]);

	return (
		<div className="flex flex-col gap-4 h-full max-h-[700px] overflow-hidden">
			<div className="flex flex-col bg-base-100 shadow-sm border-1 border-gray-100 card p-3">
				<h1 className="text-3xl col-start-2 col-end-5 text-center py-3">
					Check out you dictation result
				</h1>
			</div>
			<div className="overflow-auto flex flex-col gap-3">
				{results.map(({ id, originalWord, translations, comparison }) => (
					<div
						key={id}
						className={clsx(
							comparison.isCorrect ? "bg-green-100" : "bg-red-100",
							"flex flex-col gap-2 card w-full bg-base-100 shadow-sm border-1 border-gray-100 p-4"
						)}>
						<h1 id="correct" className="text-3xl text-emerald-500">
							{originalWord}
						</h1>
						<h1 id="user-answer" className="text-3xl">
							{comparison.differences.map(({ char, isDifferent }, index) => (
								<span
									key={`${id}-${index}`}
									className={clsx(isDifferent && "text-red-500")}>
									{char}
								</span>
							))}
						</h1>
						<p>{translations}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function compareWords(
	original: string,
	userAnswer: string | null
): WordComparison {
	if (!userAnswer) {
		return {
			isCorrect: false,
			differences: [],
		};
	}

	const differences: Array<{ char: string; isDifferent: boolean }> = [];
	let isCorrect = true;

	const maxLength = Math.max(original.length, userAnswer.length);

	for (let i = 0; i < maxLength; i++) {
		const isDifferent =
			original[i]?.toLowerCase() !== userAnswer[i]?.toLowerCase();
		if (isDifferent) {
			isCorrect = false;
		}
		differences.push({
			char: userAnswer[i] || "",
			isDifferent,
		});
	}

	return { isCorrect, differences };
}
