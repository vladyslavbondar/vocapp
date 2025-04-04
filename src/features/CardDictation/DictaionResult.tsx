import { DictationVocabularyWord } from "./CardDictation";

interface DictaionResultProps {
	dictationResult: DictationVocabularyWord[];
}

export function DictaionResult({ dictationResult }: DictaionResultProps) {
	return (
		<div className="flex flex-col gap-4 h-full max-h-[700px] overflow-hidden">
			<div className="flex flex-col bg-base-100 shadow-sm border-1 border-gray-100 card p-3">
				<h1 className="text-3xl col-start-2 col-end-5 text-center py-3">
					Check out you dictation result
				</h1>
			</div>
			<div className="overflow-auto flex flex-col gap-3">
				{dictationResult.map((word) => (
					<div
						key={word.id}
						className="flex flex-col gap-2 card w-full bg-base-100 shadow-sm border-1 border-gray-100 p-4">
						<h1 className="text-3xl">{word.originalWord}</h1>
						<p>{word.translations}</p>
						<p>
							<span className="text-gray-400">Your answers:</span>{" "}
							{word.userAnswer}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
