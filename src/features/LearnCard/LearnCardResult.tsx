import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { LearnVocabularyWord } from "./LearnCard";

interface LearnCardResultProps {
	learnResult: LearnVocabularyWord[];
}

export function LearnCardResult({ learnResult }: LearnCardResultProps) {
	const { cardId } = useParams();

	return (
		<div className="flex flex-col gap-4 h-full max-h-[700px] overflow-hidden">
			<div className="flex flex-col bg-base-100 shadow-sm border-1 border-gray-100 card p-3">
				<div className="flex justify-end">
					<Link
						to={`/dictation-card/${cardId}`}
						className="btn btn-outline btn-secondary col-start-5">
						Go to dictation
					</Link>
				</div>
				<h1 className="text-3xl text-center mb-3">
					Great work! <br /> Now you are ready for dictation
				</h1>
			</div>
			<div className="overflow-auto flex flex-col gap-3">
				{learnResult.map((word) => (
					<div
						key={word.id}
						className="flex flex-col gap-2 card w-full bg-base-100 shadow-sm border-1 border-gray-100 p-4">
						<h1 className="text-3xl">{word.originalWord}</h1>
						<p>{word.translations}</p>
						<p>
							<span className="text-gray-400">Your answers:</span>{" "}
							{word.userAnswers.join(", ")}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
